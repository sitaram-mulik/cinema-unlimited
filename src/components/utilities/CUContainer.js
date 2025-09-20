import { ScrollView, View } from 'react-native';

export function CUContainer({ className, children }) {
  return <View className={`cu-container px-4 mt-6 flex-1 ${className}`}>{children}</View>;
}
