import React, { useCallback, useRef, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { getThumbnailUrl } from '../utils/video-player';
import CUError from './utilities/CUError';
import CULoader from './utilities/CULoader';
import { useBURequest } from '../hooks/request';
import { router } from 'expo-router';
import { CAROUSEL_HEIGHT, isWeb } from '../config/constant';
import VideoOverlay from './VideoOverlay';
import { CUText } from './utilities/CUText';
import CUIcon from './utilities/CUICon';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = isWeb ? CAROUSEL_HEIGHT : width * 0.56;

export default function CarouselComponent({ carouselCollectionId }) {
  const {
    data: videosData,
    loading,
    error
  } = useBURequest({
    url: `/videos?collection=${carouselCollectionId}`
  });

  const videos = videosData?.items || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const renderItem = useCallback(
    ({ item, index }) => {
      const url = getThumbnailUrl(item.guid, item.thumbnailFileName);
      return (
        <TouchableOpacity
          key={item.id?.toString() || index.toString()}
          className="w-full"
          style={{ height: ITEM_HEIGHT }}
          onPress={() => router.push(`/video/${item.guid}`)}
        >
          <Image
            source={{ uri: url }}
            style={{ height: ITEM_HEIGHT }}
            className="w-full self-end"
            resizeMode="contain"
          />
          <VideoOverlay hideAfter={null} />
          <VideoOverlay hideAfter={null} direction="bottom" />
        </TouchableOpacity>
      );
    },
    [videos]
  );

  const handleArrowPress = direction => {
    const nextIndex =
      direction === 'left'
        ? (currentIndex - 1 + videos.length) % videos.length
        : (currentIndex + 1) % videos.length;

    setCurrentIndex(nextIndex);
    carouselRef.current?.scrollTo({ index: nextIndex, animated: true });
  };

  if (loading) return <CULoader />;
  if (error) return <CUError error={error} />;
  if (!videos || videos.length === 0) return null;

  return (
    <View className="relative">
      {/* Carousel with arrows */}
      <View className="flex-row items-center justify-center">
        {/* Left arrow */}
        <TouchableOpacity
          className="left-arrow z-10 h-full justify-center items-center absolute left-24"
          onPress={() => handleArrowPress('left')}
          accessibilityLabel="Previous Slide"
        >
          {/* <CUText className="arrow-left text-white text-4xl">{'<'}</CUText> */}
          <CUIcon icon={ChevronLeft} size={64} />
        </TouchableOpacity>

        <Carousel
          ref={carouselRef}
          width={width}
          height={ITEM_HEIGHT}
          data={videos}
          renderItem={renderItem}
          autoPlay={true}
          autoPlayInterval={5000}
          loop={true}
          onSnapToItem={index => setCurrentIndex(index)}
        />

        {/* Right arrow */}
        <TouchableOpacity
          className="z-10 h-full justify-center items-center absolute right-24"
          onPress={() => handleArrowPress('right')}
          accessibilityLabel="Next Slide"
        >
          <CUIcon icon={ChevronRight} size={64} />
        </TouchableOpacity>
      </View>

      {/* Pagination dots */}
      <View className="flex-row justify-center items-center mt-4 space-x-2">
        {videos.map((v, idx) => (
          <View
            key={v.guid}
            className={`w-2 h-2 rounded-full ${
              currentIndex === idx ? 'bg-white w-4' : 'bg-gray-500'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
