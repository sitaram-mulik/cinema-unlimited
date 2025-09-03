import React, { useState } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import CUProgress from '../components/utilities/CUProgress';
import { isMobile, isWeb, LIBRARY_ID } from '../config/constant';
import * as FileSystem from 'expo-file-system';
import { CUText } from './utilities/CUText';
import CUButton from './utilities/CUButton';
import { cuAPI } from '../config/api';
import tus from 'tus-js-client';

export default function CreateVideo() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFileData, setVideoFileData] = useState();
  const [videoFile, setVideoFile] = useState();

  const submit = async () => {
    setUploading(true);
    setProgress(0);
    const { name: filename, uri: fileUri } = videoFile;
    const filetype = videoFile.mimeType || videoFile.fileType;

    try {
      let fileBlob;

      if (isMobile) {
        // For mobile: use expo-file-system
        const resp = await fetch(fileUri);
        fileBlob = await resp.blob();
      }

      const result = await cuAPI.post('/videos', {
        libraryID: LIBRARY_ID,
        title,
        description
      });
      const { guid, AuthorizationSignature, AuthorizationExpire } = result?.data?.data || {};
      console.log('result ', guid, AuthorizationSignature, AuthorizationExpire);

      const upload = new tus.Upload(fileBlob || videoFile, {
        endpoint: 'https://video.bunnycdn.com/tusupload',
        retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],

        headers: {
          AuthorizationSignature, // SHA256 signature (library_id + api_key + expiration_time + video_id)
          AuthorizationExpire, // Expiration time as in the signature,
          VideoId: guid, // The guid of a previously created video object through the Create Video API call
          LibraryId: LIBRARY_ID
        },
        metadata: {
          filename,
          filetype
        },
        onError: error => {
          console.log('Error uploading video ', error);
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          console.log(((bytesUploaded / bytesTotal) * 100).toFixed(2) + '%');
        },
        onSuccess: () => {
          console.log('Upload finished:', upload.url);
        }
      });

      upload.start();
      console.log('Video uploaded successfully');
    } catch (err) {
      console.log('Select failed:', err);
      if (err.response) {
        console.log('Error response:', err.response.data);
        console.log('Error status:', err.response.status);
      }
    } finally {
      setUploading(false);
      setProgress(1);
    }
  };

  const selectVideoFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });

    if (!result.assets || result.canceled) return;
    try {
      let fileInfo = result?.assets?.[0];
      console.log('fileInfo ', fileInfo);
      setVideoFile(fileInfo);
    } catch (error) {
      console.log('Error while selecting file ', error);
    }
  };

  return (
    <View className="p-4 border border-primary mt-8">
      <View className="w-full mb-4">
        <CUText>Title *</CUText>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Enter video title"
          className="p-2 mb-4 bg-gray-800 text-primary border border-gray-600 rounded"
        />
        <CUText>Description</CUText>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Enter video description (optional)"
          multiline
          numberOfLines={6}
          className="p-2 mb-4 bg-gray-800 text-white border border-gray-600 rounded"
        />
      </View>
      {videoFile?.name && <CUText className="mb-2">{videoFile?.name}</CUText>}
      <CUButton
        onPress={selectVideoFile}
        disabled={uploading}
        className="mb-4"
        text={uploading ? 'Uploading...' : 'Select file'}
      />

      {isWeb && (
        <input
          type="file"
          accept="video/*"
          onChange={e => {
            const file = e.target.files[0];
            console.log('file ', file);
            if (file) setVideoFile(file);
          }}
        />
      )}

      <CUButton onPress={submit} disabled={!title.trim() || !videoFile} text="Publish" />

      {uploading && <CUProgress progress={progress} />}

      {videoData && (
        <Text className="text-green-400 mt-4 text-center">
          Video added to library!{'\n'}ID: {videoData.guid}
        </Text>
      )}
    </View>
  );
}
