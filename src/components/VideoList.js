import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import api, { cuAPI } from '../config/api';
import { getThumbnailUrl } from '../utils/video-player';
import { CUText } from './utilities/CUText';
import { Link, router } from 'expo-router';
import { isMobile, LIBRARY_ID } from '../config/constant';
import CUError from './utilities/CUError';
import CULoader from './utilities/CULoader';
import CUContentPlaceholder from './utilities/CUContentPlaceholder';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * (isMobile ? 0.275 : 0.15); // 27.5% of screen width for each item
const ITEM_HEIGHT = ITEM_WIDTH * (isMobile ? 3 / 2 : 2 / 3); // 2:3 portrait

export default function VideoList({ heading, videos, loading, error }) {
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
      <CUText className="font-bold mb-3 text-white">{heading}</CUText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {videos.map(item => {
          const url = getThumbnailUrl(item.guid, item.thumbnailFileName);
          return (
            <TouchableOpacity
              key={item.guid}
              className="mr-3"
              onPress={() => router.push(`/video/${item.guid}`)}
            >
              <View className="relative rounded-xl">
                <Image
                  source={{ uri: url }}
                  style={{
                    width: ITEM_WIDTH,
                    height: ITEM_HEIGHT
                  }}
                  className="relative z-10 rounded-lg"
                  resizeMode="cover"
                />
                {/* <CUText className="absolute z-1">Coming soon!</CUText> */}
                <CUContentPlaceholder title={item.title} className="absolute" />
              </View>
              <CUText className="text-sm mt-2 font-medium" numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </CUText>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
