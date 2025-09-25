import '../../global.css';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import VideoList from '../components/VideoList';
import Carousel from '../components/Carousel';
import { useBURequest, useCURequest } from '../hooks/request';
import BUVideoList from '../components/BUVideoList';
import {
  CAROUSEL_HEIGHT,
  RESERVED_COLL_CAROUSAL_NAME,
  RESERVED_COLLECTION_PREFIX,
  reservedCollections
} from '../config/constant';
import { useMemo } from 'react';
import { CUContainer } from '../components/utilities/CUContainer';
import { CUScrollContainer } from '../components/utilities/CUScrollContainer';
import CUHeading from '../components/utilities/CUHeading';
import { Link } from 'expo-router';
import { CULink } from '../components/utilities/CULink';

export default function App() {
  const { data: buCollectionsData } = useBURequest({
    url: `/collections?search=${RESERVED_COLLECTION_PREFIX}&itemsPerPage=10`
  });

  const { data: carouselCollection } = useBURequest({
    url: `/collections?search=${RESERVED_COLL_CAROUSAL_NAME}&itemsPerPage=10`
  });

  const carouselCollectionId = carouselCollection?.items?.[0]?.guid;

  const {
    data: recentVideosData,
    loading: recentVideosLoading,
    error: recentVideosError
  } = useCURequest({ url: `/videos` });

  const recentVideos = recentVideosData?.data;
  const buCollections = useMemo(
    () => buCollectionsData?.items?.filter(item => !reservedCollections.includes(item.name)),
    [buCollectionsData]
  );

  return (
    <View className="dashboard">
      <View style={{ height: CAROUSEL_HEIGHT }}>
        {carouselCollectionId ? <Carousel carouselCollectionId={carouselCollectionId} /> : null}
      </View>

      <View className="px-6 mt-14 collections">
        {recentVideosData?.pagination?.totalCount > 0 ? (
          <>
            <VideoList
              heading="New releases"
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
          </>
        ) : (
          <CUHeading>
            Please <CULink href="/create">upload</CULink> some content to get started!
          </CUHeading>
        )}
      </View>

      <StatusBar style="light" />
    </View>
  );
}
