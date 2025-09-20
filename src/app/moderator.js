import { View } from 'react-native';
import { CUContainer } from '../components/utilities/CUContainer';
import { useCURequest } from '../hooks/request';
import { videoStatus } from '../constants/video';
import CUGrid from '../components/utilities/CUGrid';
import CUHeading from '../components/utilities/CUHeading';
import { router } from 'expo-router';
import { CUScrollContainer } from '../components/utilities/CUScrollContainer';

export default function Moderator() {
  const { data: pendingVideosData } = useCURequest({
    url: `/videos?status=${videoStatus.PENDING}`
  });
  const pendingVideos = pendingVideosData?.data;

  return (
    <CUScrollContainer className="cu-moderator">
      {pendingVideos?.length > 0 ? (
        <CUGrid
          data={pendingVideos}
          title="Following contents are awaiting your review."
          numColumns={6}
          onItemPress={item =>
            router.push({
              pathname: '/create',
              params: { id: item.guid, role: 'moderator' }
            })
          }
        />
      ) : (
        <CUHeading>You dont have any content for review!</CUHeading>
      )}
    </CUScrollContainer>
  );
}
