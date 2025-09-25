import { useLocalSearchParams } from 'expo-router';
import VideoScreen from '../../components/VideoScreen';
import { ScrollView, View } from 'react-native';
import CUIconButton from '../../components/utilities/CUIconButton';
import { Check } from 'lucide-react-native';
import { isMobile } from '../../config/constant';
import Review from '../../components/moderator/Review';

export default function Video() {
  const { role, id } = useLocalSearchParams();
  const Container = isMobile ? ScrollView : View;

  return (
    <Container>
      <VideoScreen />
      {role === 'moderator' && <Review id={id} />}
    </Container>
  );
}
