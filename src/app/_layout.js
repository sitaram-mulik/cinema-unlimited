import { Stack, useSegments } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Header from '../components/Header';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
import { isMobile } from '../config/constant';
import { ToastProvider } from '../context/toastContext';
import { useState } from 'react';

export default function Layout() {
  const segments = useSegments();
  const currentPath = segments.join('/');
  const [isScrolled, setIsScrolled] = useState(false);

  const noTopMarginWeb = ['create', '', 'video/[id]', 'search'].includes(currentPath);
  const noTopMarginMobile = ['create', 'video/[id]', 'search'].includes(currentPath);

  let [fontsLoaded] = useFonts({
    'Microgramma-Bold': require('../../assets/fonts/Microgramma-D-Extended-Bold.otf'),
    'Microgramma-Medium': require('../../assets/fonts/Microgramma-D-Extended-Medium.otf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const getTopMargin = () => {
    if (isMobile) {
      return noTopMarginMobile ? 0 : 80;
    }
    return noTopMarginWeb ? 0 : 60;
  };

  return (
    <View
      className="main-page text-base cu-stack flex-1 bg-background h-full"
      style={{ flex: 1, minHeight: '100%' }}
    >
      <ToastProvider>
        <GestureHandlerRootView>
          <Header isScrolled={isScrolled} />
          <ScrollView
            style={{
              marginTop: getTopMargin(),
              flex: 1
            }}
            contentContainerStyle={{
              flexGrow: 1,
              minHeight: '100%'
            }}
            scrollEventThrottle={16}
            onScroll={({ nativeEvent }) => {
              const scrollY = nativeEvent.contentOffset.y;
              setIsScrolled(scrollY > 50); // adjust threshold as needed
            }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#08041fff' },
                flex: 1
              }}
            />
          </ScrollView>
          {isMobile && <BottomNav />}
        </GestureHandlerRootView>
      </ToastProvider>
    </View>
  );
}
