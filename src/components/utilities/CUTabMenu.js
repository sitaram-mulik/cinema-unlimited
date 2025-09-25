import { router, useSegments } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';

export default function CUTabMenu({ items, ...props }) {
  const segments = useSegments();
  const currentPath = segments[segments.length - 1];

  return (
    <View
      className="vertical-menu flex-row w-full border-b border-l border-backgroundSecondary"
      {...props}
    >
      {items.map(item => {
        return (
          <View key={item}>
            <TouchableOpacity
              className={`block p-4 border-r border-t border-backgroundSecondary hover hover:bg-backgroundOverlay transition  transition-colors duration-200 ease-in ${currentPath?.includes(item.toLowerCase()) ? 'bg-backgroundSecondary' : ''}`}
              onPress={() => router.push(`/account/${item.toLowerCase()}`)}
            >
              {item}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
