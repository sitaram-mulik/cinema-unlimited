import { View } from 'react-native';
import CUInput from '../utilities/CUInput';
import {
  SET_CAST,
  SET_DESCRIPTION,
  SET_DIRECTORS,
  SET_GENRES,
  SET_LANGUAGES,
  SET_PRODUCERS,
  SET_STUDIO,
  SET_TAGS,
  SET_TITLE
} from '../../utils/upload';
import genres from '../../constants/genres';
import CUPills from '../utilities/CUPills';
import { useEffect } from 'react';
import CUHeading from '../utilities/CUHeading';
import languages from '../../constants/languages';

export default function VideoDetailsForm({ updateUploadForm, uploadForm }) {
  const {
    title,
    description,
    tags,
    genres: selectedGenres,
    languages: selectedLanguages,
    producers,
    directors,
    cast,
    studio
  } = uploadForm || {};

  return (
    <View className="max-w-[1000px] m-auto">
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
          updateUploadForm({ type: SET_TAGS, payload: value?.split(',')?.map(v => v) })
        }
      />
      <CUPills
        title="Select genre"
        selectedItem={selectedGenres}
        setSelectedItem={value => updateUploadForm({ type: SET_GENRES, payload: value })}
        items={genres}
      />
      <CUPills
        title="Select languages"
        className="mt-2"
        selectedItem={selectedLanguages}
        setSelectedItem={value => updateUploadForm({ type: SET_LANGUAGES, payload: value })}
        items={languages}
      />
      <CUInput
        label="Producers"
        value={producers?.join(',') || ''}
        placeholder="Enter comma separated values"
        multiline={true}
        style={{
          height: 60,
          textAlignVertical: 'top' // ensures text starts at top
        }}
        onChangeText={value =>
          updateUploadForm({ type: SET_PRODUCERS, payload: value?.split(',')?.map(v => v) })
        }
      />
      <CUInput
        label="Directors"
        value={directors?.join(',') || ''}
        placeholder="Enter comma separated values"
        multiline={true}
        style={{
          height: 60,
          textAlignVertical: 'top' // ensures text starts at top
        }}
        onChangeText={value =>
          updateUploadForm({ type: SET_DIRECTORS, payload: value?.split(',')?.map(v => v) })
        }
      />
      <CUInput
        label="Cast"
        value={cast?.join(',') || ''}
        placeholder="Enter comma separated values"
        multiline={true}
        style={{
          height: 60,
          textAlignVertical: 'top' // ensures text starts at top
        }}
        onChangeText={value =>
          updateUploadForm({ type: SET_CAST, payload: value?.split(',')?.map(v => v) })
        }
      />
      <CUInput
        label="Studio"
        value={studio}
        onChangeText={value => updateUploadForm({ type: SET_STUDIO, payload: value })}
        placeholder="Enter Studio name"
      />
    </View>
  );
}
