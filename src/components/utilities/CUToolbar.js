import { View } from 'react-native';

export function CUToolbar({ children, className, ...props }) {
  return <View className={`w-full p-2 ${className}`}>{children}</View>;
}
