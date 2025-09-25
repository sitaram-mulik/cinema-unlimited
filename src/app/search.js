import { Image, View } from 'react-native';
import CUHeading from '../components/utilities/CUHeading';
import { CUModal } from '../components/utilities/CUModal';
import CUSearch from '../components/utilities/CUSearch';
import CUGrid from '../components/utilities/CUGrid';
import { CUText } from '../components/utilities/CUText';

export default function Search() {
  return (
    <CUModal>
      <View className="flex-row items-center justify-center text-md mb-2">
        <CUText className="text-2xl mb-0 font-microgrammaBold">Search on</CUText>
        <Image
          source={require('../../assets/logo.png')}
          style={{ width: 180, height: 60 }}
          resizeMode="contain"
        />
      </View>

      <CUSearch placeholder="Search content" />
      <CUGrid />
    </CUModal>
  );
}
