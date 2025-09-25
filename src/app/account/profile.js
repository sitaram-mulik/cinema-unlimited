import { View } from 'react-native';
import { CUContainer } from '../../components/utilities/CUContainer';
import CUDetailList from '../../components/utilities/CUDetailList';
import { PRODUCT_NAME } from '../../config/constant';
import CUContent from '../../components/utilities/CUContent';

export default function Profile() {
  return (
    <CUContent className="Profile">
      {/* <CUDetailList /> */}
      Welcome to {PRODUCT_NAME}
    </CUContent>
  );
}
