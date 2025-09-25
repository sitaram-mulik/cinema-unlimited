import { View, Text, TouchableOpacity } from 'react-native';
import { Home, HomeIcon, Search, Upload, Video } from 'lucide-react-native';
import { useRouter, useSegments } from 'expo-router';
import CUIcon from './utilities/CUICon';

export default function BottomNav() {
  const router = useRouter();
  const segments = useSegments(); // current route segments

  const tabs = [
    { label: 'Home', icon: HomeIcon, route: '/' },
    { label: 'Search', icon: Search, route: '/search' }
  ];

  return (
    <View className="flex-row items-center justify-around px-4 pb-8">
      {tabs.map(tab => {
        const isActive = segments[0] === tab.route.replace('/', '');
        return (
          <TouchableOpacity
            key={tab.label}
            className="items-center"
            onPress={() => router.navigate(tab.route)}
          >
            <CUIcon icon={tab.icon} />
            <Text className={`text-xs ${isActive ? 'text-primary' : 'text-primary'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
