import { View } from 'react-native';
import { CUText } from '../components/utilities/CUText';
import { router, useLocalSearchParams } from 'expo-router';
import CUIconButton from '../components/utilities/CUIconButton';
import { VideoIcon } from 'lucide-react-native';
import { CUScrollContainer } from '../components/utilities/CUScrollContainer';
import { CUToolbar } from '../components/utilities/CUToolbar';
import CUPills from '../components/utilities/CUPills';
import { useState } from 'react';
import { useCURequest } from '../hooks/request';
import { videoStatus } from '../constants/video';
import CUGrid from '../components/utilities/CUGrid';
import CUHeading from '../components/utilities/CUHeading';
import { CUNoData } from '../components/utilities/CUNoData';

export default function Channel() {
  const { status } = useLocalSearchParams();

  const { data: pendingVideosData } = useCURequest({
    url: `/videos?status=${status === 'published' ? videoStatus.PUBLISHED : videoStatus.PENDING}`
  });
  const pendingVideos = pendingVideosData?.data;

  return (
    <CUScrollContainer>
      <CUToolbar className="flex justify-end items-end">
        <CUIconButton
          onPress={() => router.push('/create')}
          icon={VideoIcon}
          text="Create content"
          className="h-10"
        />
      </CUToolbar>
      <CUPills
        items={['published', 'unpublished']}
        selectedItem={status}
        setSelectedItem={value =>
          router.navigate({ pathname: '/channel', params: { status: value } })
        }
        radio={true}
      />
      <View className="mt-4">
        {pendingVideos?.length > 0 ? (
          <CUGrid
            data={pendingVideos}
            numColumns={6}
            onItemPress={item =>
              router.push({
                pathname: '/create',
                params: { id: item.guid, edit: true }
              })
            }
          />
        ) : (
          <CUNoData text="You dont have any content yet!" />
        )}
      </View>
    </CUScrollContainer>
  );
}
