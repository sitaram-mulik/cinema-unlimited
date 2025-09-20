import { View } from 'react-native';
import { isMobile } from '../../config/constant';
import CUButton from './CUButton';
import CUIcon from './CUICon';
import { CUText } from './CUText';

export default function CUIconButton({ icon, otherIcon, text, textClass, ...props }) {
  return (
    <CUButton {...props}>
      {icon && (
        <View className={`${text && `${isMobile ? 'mb-2' : 'mr-2'}`}`}>
          <CUIcon icon={icon} />
        </View>
      )}
      {text && (
        <CUText className={`${isMobile} ? 'text-md' : 'text-lg' ${textClass}`}>{text}</CUText>
      )}
      {otherIcon && <CUIcon icon={otherIcon} className={`${isMobile ? 'mt-2' : 'ml-2'}`} />}
    </CUButton>
  );
}
