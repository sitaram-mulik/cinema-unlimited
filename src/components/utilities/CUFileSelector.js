import { FolderTreeIcon, Images, Upload } from 'lucide-react-native';
import CUButton from './CUButton';
import CUIcon from './CUICon';
import { View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';
import { isMobile, isWeb } from '../../config/constant';
import { CUText } from './CUText';
import * as DocumentPicker from 'expo-document-picker';
import CUIconButton from './CUIconButton';

export default function CUFileSelector({ selectOptions, onSelect, documentType }) {
  const browseFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: documentType });
    if (!result.assets || result.canceled) return;
    try {
      let fileInfo = result?.assets?.[0];
      onSelect(fileInfo);
    } catch (error) {
      console.log('Error while selecting file ', error);
    }
  };

  const selectFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    // Open gallery
    const result = await ImagePicker.launchImageLibraryAsync(selectOptions);
    const selectedVideo = result?.assets?.[0];
    if (selectedVideo && !result.canceled) {
      onSelect({ name: selectedVideo.fileName, ...selectedVideo });
    }
  };

  const browseFileWeb = e => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        console.log('file ->', file);
        const url = URL.createObjectURL(file);
        onSelect({ uri: url, size: file.size, type: file.type, name: file.name, file });
      }
    } catch (error) {
      console.log('Error while selecting file ', error);
    }
  };

  return (
    <View className="button-groups">
      {isMobile ? (
        <>
          <CUButton onPress={selectFromGallery} className="mb-4">
            <CUIcon icon={Images} />
            <CUText className="mt-2">Select from gallery</CUText>
          </CUButton>
          <CUButton onPress={browseFile}>
            <CUIcon icon={FolderTreeIcon} />
            <CUText className="mt-2">Browse files</CUText>
          </CUButton>
        </>
      ) : (
        <View className="relative h-12">
          <input
            type="file"
            accept={documentType}
            onChange={browseFileWeb}
            className="absolute top-0 left-0 opacity-0"
          />

          <CUIconButton
            className="absolute top-0 left-0 pointer-events-none w-[240px] z-10"
            icon={Upload}
            text="Select"
          />
        </View>
      )}
    </View>
  );
}
