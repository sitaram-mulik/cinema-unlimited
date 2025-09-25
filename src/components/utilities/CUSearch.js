import React from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import CUIcon from './CUICon';
import { Search } from 'lucide-react-native';

export default function CUSearch({
  value,
  onChangeText,
  onClear,
  placeholder = 'Search...',
  containerClassName = '',
  inputClassName = ''
}) {
  return (
    <View
      className={`flex-row items-center bg-backgroundSecondary rounded-full px-4 py-2 ${containerClassName}`}
    >
      <TextInput
        className={`flex-1 mr-2 text-base border-none outline-none p-2 ${inputClassName}`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={onClear}>
        <CUIcon icon={Search} size={32} />
      </TouchableOpacity>
    </View>
  );
}
