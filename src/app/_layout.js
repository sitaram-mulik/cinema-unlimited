import { Stack, useSegments } from 'expo-router';
import { View } from 'react-native';
import Header from '../components/Header';
import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomNav from '../components/BottomNav';
import { isMobile, isWeb } from '../config/constant';
import { ToastProvider } from '../context/toastContext';

export default function Layout() {
  const segments = useSegments();
  const currentPath = segments.join('/');
  let [fontsLoaded] = useFonts({
    Inter_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className={`cu-container bg-background font-sans flex-1 ${isWeb && 'overflow-auto'}`}>
        <ToastProvider>
          <Header />
          <View
            className="text-base cu-stack flex-1"
            style={{ marginTop: currentPath === 'create' ? 0 : isMobile ? 130 : 60 }}
          >
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#00050d' }
              }}
            />
          </View>
          {isMobile && <BottomNav />}
        </ToastProvider>
      </View>
    </GestureHandlerRootView>
  );
}
