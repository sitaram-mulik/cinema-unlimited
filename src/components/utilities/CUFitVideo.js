import { View } from 'react-native';
import { isWeb } from '../../config/constant';

export default function CUFitVideo({ children }) {
  return (
    <View
      className="video-container relative overflow-hidden"
      style={{ height: isWeb ? '100vh' : 'auto' }}
    >
      <View className={`${isWeb ? 'absolute bottom-0 left-0' : ''}`}>{children}</View>
    </View>
  );
}
