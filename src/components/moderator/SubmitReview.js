import { View } from 'react-native';
import CUIconButton from '../utilities/CUIconButton';
import { cuAPI } from '../../config/api';
import { videoStatus } from '../../constants/video';
import { Check } from 'lucide-react-native';

export default function SubmitReview() {
  const approveVideo = () => {
    cuAPI({
      url: '/videos',
      method: 'PUT',
      data: { guid: id, status: videoStatus.PUBLISHED }
    }).then(res => {
      console.log('resss ', res);
    });
  };
  return (
    <View>
      <CUIconButton onPress={approveVideo} icon={Check} text="Approve movie" />
    </View>
  );
}
