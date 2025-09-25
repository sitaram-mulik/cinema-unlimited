import { Button, Text, TouchableOpacity } from 'react-native';
import { CUText } from './CUText';
import { isWeb } from '../../config/constant';

export default function CUButton({ text, className, textClass, children, ...props }) {
  return (
    <TouchableOpacity
      className={`text-lg flex justify-center items-center bg-buttonColor px-4 py-2 rounded cursor-pointer ${props.disabled ? 'bg-muted' : ''} ${isWeb ? 'max-w-xs flex-row' : ''} ${className}`}
      {...props}
    >
      {text ? <CUText className={textClass}>{text}</CUText> : children}
    </TouchableOpacity>
  );
}
