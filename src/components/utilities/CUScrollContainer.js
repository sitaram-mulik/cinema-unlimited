import { ScrollView, View } from 'react-native';
import { CUContainer } from './CUContainer';
import { isMobile } from '../../config/constant';

export function CUScrollContainer({ className, children, onScroll }) {
  return (
    <CUContainer className={className}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} onScroll={onScroll}>
        {children}
      </ScrollView>
    </CUContainer>
  );
}
