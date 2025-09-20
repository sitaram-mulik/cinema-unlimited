import React from 'react';
import { View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryNav from './CategoryNav';
import { CUText } from './utilities/CUText';
import { useRouter, useSegments } from 'expo-router';
import { ChevronLeft, CircleUserRound } from 'lucide-react-native';
import { isMobile, isWeb, PRODUCT_NAME } from '../config/constant';
import CUIcon from './utilities/CUICon';

export default function Header() {
  const router = useRouter();
  const segments = useSegments();
  const isHome = segments.length === 0;
  const currentPath = segments.join('/');

  return currentPath === 'create' ? null : (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      className={`top-0 left-0 right-0 z-10 w-[98%] m-auto bg-background ${isMobile ? 'absolute' : 'fixed w-full'}`}
    >
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            {isHome || isWeb ? (
              <TouchableOpacity onPress={() => router.push('/')}>
                <CUText className="text-lg font-bold mr-6">{PRODUCT_NAME}</CUText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => router.back()}>
                <CUIcon icon={ChevronLeft} size={28} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={() => router.push('/account')}>
            <CUIcon icon={CircleUserRound} size={28} />
          </TouchableOpacity>
        </View>
        {/* {(isHome || isWeb) && <CategoryNav />} */}
      </View>
    </SafeAreaView>
  );
}
