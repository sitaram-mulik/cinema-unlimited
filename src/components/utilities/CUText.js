import { Text } from 'react-native';

export function CUText({ className, ...props }) {
  return <Text className={`text-primary ${className}`} {...props} />;
}
