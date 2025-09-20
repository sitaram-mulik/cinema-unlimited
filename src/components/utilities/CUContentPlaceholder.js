import { View } from 'react-native';
import CUIcon from './CUICon';
import { CUText } from './CUText';
import { CameraOff } from 'lucide-react-native';

export default function CUContentPlaceholder({ title, className }) {
  return (
    <View
      className={`flex-1 w-full h-full justify-center items-center bg-backgroundSecondary border rounded-lg ${className}`}
    >
      <CUIcon icon={CameraOff} size={40} />
      {title && <CUText className="text-xl mt-2">{title}</CUText>}
    </View>
  );
}
