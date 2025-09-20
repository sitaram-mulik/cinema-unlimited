import { TextInput, View } from 'react-native';
import { CUText } from './CUText';

export default function CUInput({ label, ...props }) {
  return (
    <View className="w-full my-4">
      <CUText className="mb-2">{label}</CUText>
      <TextInput
        className="p-2 bg-backgroundSecondary text-primary border rounded text-md placeholder:primary"
        placeholderTextColor="#888"
        {...props}
      />
    </View>
  );
}
