import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CUText } from './utilities/CUText';
import { useRouter, useSegments } from 'expo-router';
import { ChevronLeft, CircleUserRound } from 'lucide-react-native';
import { CONTAINER_WIDTH, isMobile, isWeb, PRODUCT_NAME } from '../config/constant';
import CUIcon from './utilities/CUICon';
import MainNav from './utilities/MainNav';

const excludeHeaders = ['create', 'search'];

export default function Header({ isScrolled }) {
  const segments = useSegments();
  const isHome = segments.length === 0;
  const currentPath = segments.join('/');

  return excludeHeaders.includes(currentPath) ? null : isMobile ? (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className={`header absolute top-0 left-0 z-[50] m-auto overflow-hidden`}
    >
      <View className={`w-full ${isMobile ? 'bg-background p-4' : 'fixed w-full p-8'}`}>
        <MainNav isHome={isHome} />
      </View>
    </SafeAreaView>
  ) : (
    <View className="header fixed w-full top-0 left-0 z-[50]">
      <View
        className={`p-4 rounded-b-xl max-w-[1800px] m-auto w-full transition ease-in-out delay-200 ${isScrolled ? 'bg-backgroundOverlay' : 'transparent'}`}
      >
        <MainNav isHome={isHome} />
      </View>
      {!isScrolled && (
        <View
          className="title-overlay h-32 w-full absolute z-1 top-0 left-0 z-[2]"
          style={{
            pointerEvents: 'none',
            background:
              'linear-gradient(180deg,rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.05) 80%, rgba(0, 0, 0, 0.02) 90%, rgba(0, 0, 0, 0) 100%)'
          }}
        />
      )}
    </View>
  );
}
