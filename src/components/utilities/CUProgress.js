import { View } from 'react-native';
import { CUText } from './CUText';

export default function CUProgress({ progress }) {
  return (
    <View>
      <View className="w-full bg-backgroundSecondary rounded my-4">
        <View className="h-2 bg-primary rounded" style={{ width: `${progress}%` }} />
      </View>
    </View>
  );
}
