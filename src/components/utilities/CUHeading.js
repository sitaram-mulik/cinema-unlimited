import { isMobile } from '../../config/constant';
import { CUText } from './CUText';

export default function CUHeading({ children }) {
  return <CUText className={`text-xl ${isMobile ? 'mb-2' : 'mb-4'}`}>{children}</CUText>;
}
