import { View, ScrollView } from 'react-native';
import NativeVideoPlayer from '../NativePlayer';
import { SET_CATEGORY, SET_VIDEO_FILE } from '../../utils/upload';
import CUFileSelector from '../utilities/CUFileSelector';
import { catPills, videoStatus } from '../../constants/video';
import CUPills from '../utilities/CUPills';
import { useEffect } from 'react';
import { CUScrollContainer } from '../utilities/CUScrollContainer';
import CUHeading from '../utilities/CUHeading';
import { CUText } from '../utilities/CUText';
import { getByteSizeinUnit } from '../../utils/common';
import BunnyPlayer from '../BunnyPlayer';
import { buVideoStreamURL } from '../../config/constant';
import { getVideoUrl } from '../../utils/video-player';
import { CUContainer } from '../utilities/CUContainer';

export default function VideoSelector({ uploadForm, updateUploadForm, isEdit }) {
  const { localVideoFile, category, status } = uploadForm;

  return (
    <View className="mb-4 flex-row ">
      <View className="w-1/3">
        {status !== videoStatus.PUBLISHED && (
          <View className="mb-4">
            <CUPills
              items={catPills}
              radio
              setSelectedItem={value => updateUploadForm({ type: SET_CATEGORY, payload: value })}
              selectedItem={category}
            />
          </View>
        )}
        {/* {!isEdit && ( */}
        {/* {status !== videoStatus.PUBLISHED && ( */}
        <>
          <CUFileSelector
            selectOptions={{
              mediaTypes: ['videos'],
              allowsEditing: false,
              quality: 1,
              videoMaxDuration: 3 * 60 * 60 // 3 hours in seconds
            }}
            onSelect={value => updateUploadForm({ type: SET_VIDEO_FILE, payload: value })}
            documentType="video/*, .mkv, video/x-matroska"
          />
          {localVideoFile && (
            <View>
              <CUText className="my-2 text-md">File name: {localVideoFile.name}</CUText>
              <CUText className="mb-2 text-md">
                File size: {getByteSizeinUnit(localVideoFile.size)}
              </CUText>
            </View>
          )}
        </>
        {/* )} */}
        {/* )} */}
      </View>
      <View className="mt-8">
        {localVideoFile && (
          <NativeVideoPlayer
            videoUrl={localVideoFile.uri}
            onLoad={meta => {
              console.log('Video duration in seconds:', meta.duration);
              setDuration(meta.duration);
            }}
          />
        )}
        {!localVideoFile && uploadForm.id && <BunnyPlayer videoUrl={getVideoUrl(uploadForm.id)} />}
        {/* <Slider
              // style={{ width: width - 40, alignSelf: 'center' }}
              minimumValue={0}
              maximumValue={1}
              // onValueChange={handleSliderChange}
              onSlidingComplete={time => setThumbnail(localVideoFile.uri, time * 1000)}
            /> */}
        {/* {selectedThumb && (
              <Image
                style={{ width: selectedThumb?.width / 2, height: selectedThumb?.height / 2 }}
                src={{ uri: selectedThumb.uri }}
              />
            )} */}
      </View>
    </View>
  );
}
