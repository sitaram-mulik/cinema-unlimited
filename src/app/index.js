import '../../global.css';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import VideoList from '../components/VideoList';
import Carousel from '../components/Carousel';
import { LIST_COLLECTION_PREFIX } from '../config/constant';
import { useBURequest, useCURequest } from '../hooks/request';
import BUVideoList from '../components/BUVideoList';

export default function App() {
  const { data: buCollectionsData } = useBURequest({
    url: `/collections?search=${LIST_COLLECTION_PREFIX}&itemsPerPage=10`
  });

  const { data: carouselCollection } = useBURequest({
    url: `/collections?search=carousel&itemsPerPage=10`
  });

  const carouselCollectionId = carouselCollection?.items?.[0]?.guid;

  const {
    data: recentVideosData,
    loading: recentVideosLoading,
    error: recentVideosError
  } = useCURequest({ url: `/videos` });

  const recentVideos = recentVideosData?.data;
  const buCollections = buCollectionsData?.items;

  return (
    <View className="cu-home">
      {carouselCollectionId && <Carousel carouselCollectionId={carouselCollectionId} />}
      <VideoList
        heading="Recently added"
        videos={recentVideos}
        loading={recentVideosLoading}
        error={recentVideosError}
      />
      {buCollections?.map(collection => {
        return (
          <BUVideoList
            key={collection?.guid}
            collectionId={collection?.guid}
            collectionName={collection?.name}
          />
        );
      })}
      <StatusBar style="light" />
    </View>
  );
}
