import { TouchableOpacity, View } from 'react-native';
import { LIBRARY_ID } from '../config/constant';
import { router } from 'expo-router';
import { CUText } from '../components/utilities/CUText';
import CUButton from '../components/utilities/CUButton';
import { ArrowLeft, CreativeCommons, ImagesIcon, VideoIcon, ViewIcon } from 'lucide-react-native';

export default function Account() {
  return (
    <View className="p-4">
      <CUText className="text-xl mb-4">Explore your content!</CUText>
      <View className="flex flex-row flex-wrap -mx-2">
        <View className="px-2 w-1/2 mb-4">
          <CUButton className="h-32" onPress={() => router.push('/library')}>
            <ImagesIcon color={'black'} size={24} />
            <CUText className="text-secondary text-xl">View content</CUText>
          </CUButton>
        </View>
        <View className="px-2 w-1/2 mb-4">
          <CUButton className="h-32" onPress={() => router.push('/create')}>
            <VideoIcon color={'black'} size={24} />
            <CUText className="text-secondary text-xl">Publish content</CUText>
          </CUButton>
        </View>
      </View>
    </View>
  );
}
