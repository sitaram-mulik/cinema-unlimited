import { View } from 'react-native';
import CUInput from '../utilities/CUInput';
import { SET_DESCRIPTION, SET_GENRES, SET_TAGS, SET_TITLE } from '../../utils/upload';
import genres from '../../constants/genres';
import CUPills from '../utilities/CUPills';
import { useEffect } from 'react';
import CUHeading from '../utilities/CUHeading';

export default function VideoDetailsForm({ updateUploadForm, uploadForm }) {
  const { title, description, tags, genres: selectedGenres } = uploadForm || {};

  return (
    <View className="max-w-[1000px] m-auto">
      <CUHeading>Video Details</CUHeading>
      <CUInput
        label="Title *"
        value={title}
        onChangeText={value => updateUploadForm({ type: SET_TITLE, payload: value })}
        placeholder="Enter video title"
      />
      <CUInput
        label="Description"
        value={description}
        placeholder="Enter video description"
        multiline={true}
        style={{
          height: 120,
          textAlignVertical: 'top' // ensures text starts at top
        }}
        onChangeText={value => updateUploadForm({ type: SET_DESCRIPTION, payload: value })}
      />
      <CUInput
        label="Tags"
        value={tags?.join(',') || ''}
        placeholder="Enter comma separated values"
        multiline={true}
        style={{
          height: 60,
          textAlignVertical: 'top' // ensures text starts at top
        }}
        onChangeText={value =>
          updateUploadForm({ type: SET_TAGS, payload: value?.split(',')?.map(v => v.trim()) })
        }
      />
      <CUPills
        title="Select genre"
        selectedItem={selectedGenres}
        setSelectedItem={value => updateUploadForm({ type: SET_GENRES, payload: value })}
        items={genres}
      />
    </View>
  );
}
