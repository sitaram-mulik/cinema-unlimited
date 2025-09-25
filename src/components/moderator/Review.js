import { View } from 'react-native';
import CUIconButton from '../utilities/CUIconButton';
import { cuAPI } from '../../config/api';
import { videoStatus } from '../../constants/video';
import { Check } from 'lucide-react-native';
import { useToast } from '../../context/toastContext';
import { router } from 'expo-router';

export default function Review({ id }) {
  const { showToast } = useToast();

  const approveVideo = () => {
    cuAPI({
      url: '/videos/' + id,
      method: 'PATCH',
      data: { guid: id, status: videoStatus.PUBLISHED }
    })
      .then(() => {
        showToast('Video is approved successfully', 'success');
        router.navigate('/account/moderator');
      })
      .catch(err => {
        showToast(err.message);
      });
  };
  return (
    <View class="moderator-section" style={{ margin: '8px' }}>
      <View className="flex-row justify-end w-full">
        <CUIconButton onPress={approveVideo} icon={Check} text="Approve" className="mb-4" />
      </View>
    </View>
  );
}
