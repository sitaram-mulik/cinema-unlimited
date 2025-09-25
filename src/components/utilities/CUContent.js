import { View } from 'react-native';
import { CONTAINER_WIDTH } from '../../config/constant';

export default function CUContent({ children }) {
  return (
    <View
      className={`m-auto py-4 max-w-[1800px] w-full h-full flex-1 rounded-xl flexGrow`}
      style={{
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      {children}
    </View>
  );
}
