import { Image, TouchableOpacity, View } from 'react-native';
import { isWeb } from '../../config/constant';
import { router } from 'expo-router';
import CUIcon from './CUICon';
import { CircleUserRoundIcon, Search } from 'lucide-react-native';

export default function MainNav({ isHome }) {
  return (
    <View className="flex-row items-center justify-between w-full relative z-[50]">
      <View className="flex-row items-center">
        {isHome || isWeb ? (
          <TouchableOpacity onPress={() => router.push('/')}>
            <Image
              source={require('../../../assets/logo.png')}
              style={{ width: 120, height: 40 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => router.back()}>
            <CUIcon icon={ChevronLeft} size={28} />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row flex-1 items-center justify-end">
        {isWeb && (
          <TouchableOpacity onPress={() => router.push('/search')}>
            <CUIcon icon={Search} />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => isWeb && router.push('/account/profile')} className="ml-4">
          <CUIcon icon={CircleUserRoundIcon} size={28} />
        </TouchableOpacity>
      </View>
    </View>
  );

  {
    /* {(isHome || isWeb) && <CategoryNav />} */
  }
}
