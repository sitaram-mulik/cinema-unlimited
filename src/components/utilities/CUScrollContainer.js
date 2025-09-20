import { ScrollView, View } from 'react-native';
import { CUContainer } from './CUContainer';
import { isMobile } from '../../config/constant';

export function CUScrollContainer({ className, children }) {
  return (
    <CUContainer className={className}>
      {isMobile ? <ScrollView>{children}</ScrollView> : <View>{children}</View>}
    </CUContainer>
  );
}
