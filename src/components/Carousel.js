import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { getThumbnailUrl } from '../utils/video-player';
import { CUText } from './utilities/CUText';
import CUError from './utilities/CUError';
import CULoader from './utilities/CULoader';
import { cuAPI } from '../config/api';
import { useBURequest } from '../hooks/request';
import { ReceiptRussianRuble } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const ITEM_HEIGHT = width * 0.56;

export default function Carousel({ carouselCollectionId }) {
  const {
    data: videosData,
    loading,
    error
  } = useBURequest({
    url: `/videos?collection=${carouselCollectionId}`
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const autoScrollInterval = useRef(null);

  const videos = videosData?.items;
  useEffect(() => {
    if (videos?.length > 1) {
      // Start auto-scrolling
      autoScrollInterval.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % videos.length;
          scrollViewRef.current?.scrollTo({
            x: nextIndex * width,
            animated: true
          });
          return nextIndex;
        });
      }, 4000); // Change slide every 4 seconds

      return () => {
        if (autoScrollInterval.current) {
          clearInterval(autoScrollInterval.current);
        }
      };
    }
  }, [videos?.length]);

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleManualScroll = event => {
    // Clear auto-scroll when user manually scrolls
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
    handleScroll(event);
  };

  if (loading) {
    return <CULoader />;
  }

  if (error) {
    return <CUError error={error} />;
  }

  if (!videos?.length) {
    return null;
  }

  return (
    <View className="mb-6">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleManualScroll}
        scrollEventThrottle={16}
        className="px-0"
      >
        {videos.map((item, index) => {
          const url = getThumbnailUrl(item.guid);
          return (
            <TouchableOpacity
              key={item.id?.toString() || index.toString()}
              className="relative"
              onPress={() => router.push(`/video/${item.guid}`)}
            >
              <Image
                source={{ uri: url }}
                style={{
                  width: width,
                  height: ITEM_HEIGHT
                }}
                className="rounded-none"
                resizeMode="cover"
              />
              <CUText>{item?.title}</CUText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Pagination dots */}
      <View className="flex-row justify-center items-center mt-4 space-x-2">
        {videos.map((v, index) => (
          <View
            key={v.guid}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-6' : 'bg-gray-500'
            }`}
          />
        ))}
      </View>
    </View>
  );
}
