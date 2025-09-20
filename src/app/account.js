import { TouchableOpacity, View } from 'react-native';
import { LIBRARY_ID } from '../config/constant';
import { router } from 'expo-router';
import { CUText } from '../components/utilities/CUText';
import CUButton from '../components/utilities/CUButton';
import {
  ArrowLeft,
  CreativeCommons,
  DraftingCompass,
  Edit,
  ImagesIcon,
  Scissors,
  VideoIcon,
  ViewIcon
} from 'lucide-react-native';
import CUIcon from '../components/utilities/CUICon';
import CUIconButton from '../components/utilities/CUIconButton';

export default function Account() {
  return (
    <View className="flex flex-row flex-wrap -mx-2 px-6 max-w-[1000px] mx-auto mt-0 w-full justify-start items-start">
      {/* <View className="px-2 w-1/2 mb-4 rounded border">
          <CUButton className="h-32" onPress={() => router.push('/library')}>
            <CUIcon icon={Edit} size={24} />
            <CUText className="text-xl mt-2">Drafts</CUText>
          </CUButton>
        </View> */}
      <View className="px-2 w-1/2 mb-4 rounded border">
        <CUIconButton
          className="h-32 max-w-full"
          onPress={() =>
            router.push({
              pathname: '/channel',
              params: { status: 'published' }
            })
          }
          icon={ImagesIcon}
          text="My Channel"
        />
      </View>
      <View className="px-2 w-1/2 mb-4 rounded border">
        <CUIconButton
          className="h-32 max-w-full"
          onPress={() => router.push('/moderator')}
          icon={Scissors}
          text="Moderator section"
        />
      </View>
    </View>
  );
}
