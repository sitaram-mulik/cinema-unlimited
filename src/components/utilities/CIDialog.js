import { View } from 'react-native';
import { CUText } from './CUText';
import CUButton from './CUButton';
import { isMobile } from '../../config/constant';

export default function CUDialog({ title, content, onAction }) {
  return (
    <View className="dialog fixed inset-0 z-[50] flex items-center justify-center h-full w-full flex-1 bg-primary">
      <View className={`p-6 rounded-lg shadow-lg ${isMobile ? 'w-[95%]' : 'w-1/3'}`}>
        <CUText className="text-xl font-bold mb-4 text-secondary">{title}</CUText>
        <CUText className="text-secondary mb-6">{content}</CUText>
        <View className="flex justify-end space-x-4 flex-row flex-wrap">
          <CUButton text="Cancel" onPress={() => onAction('cancel')} />
          <CUButton text="Confirm" onPress={() => onAction('confirm')} />
        </View>
      </View>
    </View>
  );
}
