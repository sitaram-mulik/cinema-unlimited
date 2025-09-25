import { useCURequest } from '../../hooks/request';
import { videoStatus } from '../../constants/video';
import CUGrid from '../../components/utilities/CUGrid';
import { router } from 'expo-router';
import { CUNoData } from '../../components/utilities/CUNoData';
import { CUContainer } from '../../components/utilities/CUContainer';

export default function Moderator() {
  const { data: pendingVideosData } = useCURequest({
    url: `/videos?status=${videoStatus.PENDING}`
  });
  const pendingVideos = pendingVideosData?.data;

  return (
    <CUContainer className="cu-moderator">
      {pendingVideos?.length > 0 ? (
        <CUGrid
          data={pendingVideos}
          title="Following contents are awaiting your review."
          numColumns={6}
          onItemPress={item =>
            router.push({
              pathname: '/video/' + item.guid + '?role=moderator'
            })
          }
        />
      ) : (
        <CUNoData text="You dont have any content for review!" />
      )}
    </CUContainer>
  );
}
