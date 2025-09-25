import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import CUProgress from '../components/utilities/CUProgress';
import { LIBRARY_ID, STORAGE_WRITE_KEY, STORAGE_ZONE } from '../config/constant';
import * as FileSystem from 'expo-file-system';

export default function UploadScreen() {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const pickAndUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'video/*' });

    if (!result.assets || result.canceled) return;

    const fileUri = result.assets[0].uri;
    const fileName = result.assets[0].name;

    setUploading(true);
    setProgress(0);

    try {
      let fileBlob;

      // Platform-specific file handling
      if (Platform.OS === 'web') {
        // For web: use fetch to get the file as blob
        const response = await fetch(fileUri);
        fileBlob = await response.blob();
      } else {
        // For mobile: use expo-file-system
        const base64Data = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64
        });

        // Convert base64 to Uint8Array and create blob
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        fileBlob = new Blob(byteArrays, { type: 'video/mp4' });
      }

      // Upload to Storage using Axios
      await axios.put(`https://storage.bunnycdn.com/${STORAGE_ZONE}/${fileName}`, fileBlob, {
        headers: {
          AccessKey: STORAGE_WRITE_KEY,
          'Content-Type': fileBlob.type
        },
        onUploadProgress: event => {
          setProgress(event.loaded / event.total);
        }
      });

      const storageUrl = `https://storage.bunnycdn.com/${STORAGE_ZONE}/${fileName}`;
      console.log('Upload complete:', storageUrl);

      // TODO: Add to Video Library functionality here
      // const libraryRes = await axios.post(
      //   `https://video.bunnycdn.com/library/${LIBRARY_ID}/videos`,
      //   {
      //     title: fileName,
      //     videoUrl: storageUrl,
      //     description: "Uploaded from Expo",
      //     isPrivate: false,
      //   },
      //   {
      //     headers: {
      //       AccessKey: LIBRARY_API_KEY,
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      // setVideoData(libraryRes.data);
      console.log('Video uploaded successfully');
    } catch (err) {
      console.log('Upload failed:', err);
      if (err.response) {
        console.log('Error response:', err.response.data);
        console.log('Error status:', err.response.status);
      }
    } finally {
      setUploading(false);
      setProgress(1);
    }
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <TouchableOpacity
        className="bg-blue-600 px-4 py-2 rounded mb-6"
        onPress={pickAndUpload}
        disabled={uploading}
      >
        <Text className="text-white text-lg">
          {uploading ? 'Uploading...' : 'Pick & Upload Video'}
        </Text>
      </TouchableOpacity>

      {uploading && <CUProgress progress={progress} />}

      {videoData && (
        <Text className="text-green-400 mt-4 text-center">
          Video added to library!{'\n'}ID: {videoData.guid}
        </Text>
      )}
    </View>
  );
}
