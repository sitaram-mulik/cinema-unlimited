import { isMobile } from '../../config/constant';
import { CUText } from './CUText';

export default function CUHeading({ children, className }) {
  return (
    <CUText
      className={`text-3xl text-center font-microgrammaBold ${isMobile ? 'mb-2' : 'mb-12'} ${className}`}
    >
      {children}
    </CUText>
  );
}
