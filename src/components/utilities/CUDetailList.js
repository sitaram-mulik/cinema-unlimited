import { View } from 'react-native';
import { CUText } from './CUText';

export default function CUDetailList({ properties = {} }) {
  const keys = Object.keys(properties);

  const renderValue = key => {
    switch (typeof properties[key]) {
      case 'string':
        return properties[key];
      case 'number':
        return properties[key];
      case 'boolean':
        return properties[key] === true ? 'Yes' : 'No';
      case 'object':
        return Array.isArray(properties[key]) ? properties[key].join(', ') || '_' : '_';

      default:
        return '_';
    }
  };

  return (
    <View className=" divide-y divide-gray-200 text-sm max-w-[1000px] m-4 ">
      {keys.map(key => (
        <View className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 p-4 border-none">
          <CUText className="text-primary font-medium text-xl">{key}</CUText>
          <CUText className="text-primary sm:col-span-2  text-xl">{renderValue(key)}</CUText>
        </View>
      ))}
    </View>
  );
}
