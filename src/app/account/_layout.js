import { router, Stack, useSegments } from 'expo-router';
import { View } from 'react-native';
import { CUScrollContainer } from '../../components/utilities/CUScrollContainer';
import CUHeading from '../../components/utilities/CUHeading';
import { CUContainer } from '../../components/utilities/CUContainer';
import CUTabMenu from '../../components/utilities/CUTabMenu';

export default function AccountLayout() {
  const segments = useSegments();

  return (
    <CUContainer>
      <CUHeading>My Account</CUHeading>
      <CUTabMenu items={['Profile', 'Channel', 'Moderator']} />
      <View className="bg-white">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#FFFFFF' }
          }}
        />
      </View>
    </CUContainer>
  );
}
