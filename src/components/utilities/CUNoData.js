import { View } from 'react-native';
import { CUText } from './CUText';

export function CUNoData({ text = 'No data to display!', className = '' }) {
  return (
    <View className={`p-4 ${className}`}>
      <CUText className="text-lg">{text}</CUText>
    </View>
  );
}
