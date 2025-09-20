import { View } from 'react-native';
import { useReducer, useState, useEffect } from 'react';
import VideoSelector from '../components/uploader/VideoSelector';
import VideoDetailsForm from '../components/uploader/VideoDetailsForm';
import PublishVideo from '../components/uploader/PublishVideo';
import { RESET, uploadVideoInitialState, uploadVideoReducer } from '../utils/upload';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import ThumbnailSelector from '../components/uploader/ThumbnailSelector';
import { useLocalSearchParams } from 'expo-router';
import CUIconButton from '../components/utilities/CUIconButton';
import { useVideoData } from '../hooks/videos';
import { CUModal } from '../components/utilities/CUModal';
import { usePendingCollectionId } from '../hooks/upload';

export default function Create() {
  const { id, edit } = useLocalSearchParams();
  const videoData = useVideoData(id, !edit);
  const [state, dispatch] = useReducer(uploadVideoReducer, uploadVideoInitialState);
  const [currentStep, setCurrentStep] = useState(1);
  usePendingCollectionId(dispatch);

  useEffect(() => {
    if (videoData) {
      console.log('videoData ', videoData);
      const {
        guid,
        title,
        description,
        category,
        tags,
        genres,
        status,
        thumbnailFileName,
        version
      } = videoData;
      const updatedState = {
        id: guid,
        title,
        description,
        category,
        tags,
        genres,
        status,
        thumbnailFileName,
        version: Number(version) || 0
      };
      dispatch({ type: RESET, payload: updatedState });
    }
  }, [videoData]);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(step => step + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(step => step - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <VideoSelector uploadForm={state} isEdit={edit} updateUploadForm={dispatch} />;
      case 2:
        return <ThumbnailSelector uploadForm={state} updateUploadForm={dispatch} />;
      case 3:
        return <VideoDetailsForm uploadForm={state} updateUploadForm={dispatch} />;
      case 4:
        return <PublishVideo uploadForm={state} isEdit={edit} updateUploadForm={dispatch} />;
      default:
        return null;
    }
  };

  const renderFooter = () => (
    <View className={`flex-row ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}>
      {currentStep > 1 && (
        <CUIconButton onPress={prevStep} className="flex-row" icon={ChevronLeft} text="Back" />
      )}
      {currentStep < 4 && (
        <CUIconButton
          onPress={nextStep}
          className="flex-row"
          otherIcon={ChevronRight}
          text="Next"
        />
      )}
    </View>
  );

  return (
    <CUModal
      title="Publish content"
      footer={renderFooter()}
      subtitle={`Step ${currentStep} of 4`}
      preventClose
    >
      <View className="mb-12">{renderStep()}</View>
    </CUModal>
  );
}
