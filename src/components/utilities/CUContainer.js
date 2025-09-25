import { ScrollView, View } from 'react-native';
import { CONTAINER_WIDTH } from '../../config/constant';

export function CUContainer({ className, children }) {
  return (
    <View className={`cu-container flex-1 max-w-[1800px] m-auto w-full p-4 ${className} -`}>
      {children}
    </View>
  );
}
