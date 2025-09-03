import { Button, Text, TouchableOpacity } from 'react-native';

export default function CUButton({ text, className, textClass, children, ...props }) {
  return (
    <TouchableOpacity
      className={`text-lg flex justify-center items-center bg-backgroundSecondary px-4 py-2 rounded ${className} ${props.disabled ? 'bg-muted' : ''}`}
      {...props}
    >
      {text ? <Text className={textClass}>{text}</Text> : children}
    </TouchableOpacity>
  );
}
