import { View } from 'react-native';
import { useReducer, useState, useEffect } from 'react';
import VideoSelector from '../components/uploader/VideoSelector';
import VideoDetailsForm from '../components/uploader/VideoDetailsForm';
import PublishVideo from '../components/uploader/PublishVideo';
import { RESET, uploadVideoInitialState, uploadVideoReducer } from '../utils/upload';
import { ChevronLeft, ChevronRight, Delete, Trash } from 'lucide-react-native';
import ThumbnailSelector from '../components/uploader/ThumbnailSelector';
import { router, useLocalSearchParams } from 'expo-router';
import CUIconButton from '../components/utilities/CUIconButton';
import { useVideoData } from '../hooks/videos';
import { CUModal } from '../components/utilities/CUModal';
import { usePendingCollectionId } from '../hooks/upload';
import { cuAPI } from '../config/api';
import { useToast } from '../context/toastContext';
import CUDialog from '../components/utilities/CIDialog';

export default function Create() {
  const { id, edit } = useLocalSearchParams();
  const videoData = useVideoData(id, !edit);
  const [state, dispatch] = useReducer(uploadVideoReducer, uploadVideoInitialState);
  const [currentStep, setCurrentStep] = useState(1);
  const [disablePrev, setDisablePrev] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { showToast } = useToast();

  usePendingCollectionId(dispatch);

  useEffect(() => {
    if (videoData) {
      const {
        guid,
        title,
        description,
        category,
        tags,
        genres,
        status,
        thumbnailFileName,
        thumbnailStoragePath,
        directors,
        producers,
        cast,
        studio,
        languages,
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
        thumbnailStoragePath,
        directors,
        producers,
        cast,
        studio,
        languages,
        version: Number(version) || 0
      };
      dispatch({ type: RESET, payload: updatedState });
    }
  }, [videoData]);

  const deleteVideo = async () => {
    try {
      await cuAPI.delete('/videos/' + id);
      router.navigate('/account/channel?status=drafts');
    } catch (error) {
      showToast(error?.message);
    }
  };

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
        return (
          <PublishVideo
            uploadForm={state}
            isEdit={edit}
            updateUploadForm={dispatch}
            setDisablePrev={setDisablePrev}
          />
        );
      default:
        return null;
    }
  };

  const renderFooter = () => (
    <View className={`flex-row ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}>
      {currentStep > 1 && !disablePrev && (
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

  const renderButtons = () => {
    return (
      edit &&
      id && (
        <CUIconButton
          icon={Trash}
          onPress={() => setShowDeleteDialog(true)}
          text="Delete"
          className="mr-4"
        />
      )
    );
  };

  const getSubtitle = () => {
    switch (currentStep) {
      case 1:
        return `Step ${currentStep}: Select video`;
      case 2:
        return `Step ${currentStep}: Choose cover`;
      case 3:
        return `Step ${currentStep}: Video details`;
      case 4:
        return `Step ${currentStep}: Submit`;

      default:
        break;
    }
  };

  return (
    <>
      <CUModal
        footer={renderFooter()}
        buttons={renderButtons()}
        subtitle={getSubtitle()}
        title="Create content"
        preventClose
      >
        <View className="mb-12">{renderStep()}</View>
      </CUModal>
      {showDeleteDialog && (
        <CUDialog
          title="Delete video"
          content="Are you sure you want to delete this video ? This action is not reversible."
          onAction={action => {
            if (action === 'cancel') setShowDeleteDialog(false);
            else deleteVideo();
          }}
        />
      )}
    </>
  );
}
