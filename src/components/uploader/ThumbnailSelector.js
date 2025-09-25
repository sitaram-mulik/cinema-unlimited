import { Dimensions, ScrollView, View } from 'react-native';
import { Image } from 'expo-image';
import CUFileSelector from '../utilities/CUFileSelector';
import { SET_THUMBNAIL_IMAGE } from '../../utils/upload';
import { isMobile } from '../../config/constant';
import CUImage from '../utilities/CUImage';
import CUHeading from '../utilities/CUHeading';
import { getThumbnailUrl } from '../../utils/video-player';

const width = isMobile ? Dimensions.get('window')?.width : 1000;
const height = (width * 9) / 16;

export default function ThumbnailSelector({ updateUploadForm, uploadForm }) {
  const onSelect = async value => {
    updateUploadForm({ type: SET_THUMBNAIL_IMAGE, payload: value });
  };

  const imageUri = uploadForm?.localThumbnailFile?.uri;

  console.log(
    'getThumbnailUrl(uploadForm.thumbnailFileName) ',
    uploadForm,
    getThumbnailUrl(uploadForm?.id, uploadForm.thumbnailFileName)
  );

  return (
    <View>
      <CUFileSelector
        selectOptions={{
          mediaTypes: ['images'],
          allowsEditing: false,
          quality: 1
          // aspect: [9, 16]
        }}
        onSelect={onSelect}
        documentType="image/*"
      />
      {(imageUri || uploadForm.thumbnailFileName) && (
        <>
          <View className="flex justify-center items-center my-4">
            <CUImage
              imageUri={
                imageUri ? imageUri : getThumbnailUrl(uploadForm?.id, uploadForm.thumbnailFileName)
              }
              height={height}
              width={width}
            />
          </View>
        </>
      )}
    </View>
  );
}
