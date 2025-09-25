import { X } from 'lucide-react-native';
import CUIconButton from './CUIconButton';
import CUHeading from './CUHeading';
import { View } from 'react-native';
import { CUText } from './CUText';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { isWeb } from '../../config/constant';

export function CUModal({ title, subtitle, children, footer, buttons, preventClose, className }) {
  useEffect(() => {
    if (!preventClose) return;
    const handleBeforeUnload = e => {
      e.preventDefault();
      e.returnValue = ''; // this triggers the native confirm dialog
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [preventClose]);

  const closeModal = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/'); // fallback to home
    }
  };
  return (
    <View className={`w-full h-full p-4 ${className}`}>
      <View
        className={`modal-header fixed top-0 w-full left-0 right-0 p-4 bg-background m-auto ${isWeb ? 'h-24' : ''}`}
      >
        <CUHeading>{title}</CUHeading>
        {subtitle && <CUText className="text-lg mb-4">{subtitle}</CUText>}
        <View
          className={`modal-toolbar absolute cursor-pointer z-[49] flex flex-row ${isWeb ? 'top-4 right-4' : 'top-1 right-1'}`}
        >
          {buttons}
          <CUIconButton icon={X} onPress={closeModal} className="bg-transparent" />
        </View>
      </View>
      <View className="modal-content mt-32 mb-24">{children}</View>

      <View className={`modal-footer bg-background z-[49]`}>{footer}</View>
    </View>
  );
}
