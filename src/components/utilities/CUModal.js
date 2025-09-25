import { X } from 'lucide-react-native';
import CUIconButton from './CUIconButton';
import CUHeading from './CUHeading';
import { View } from 'react-native';
import { CUText } from './CUText';
import { useEffect } from 'react';
import { router } from 'expo-router';

export function CUModal({ title, subtitle, children, footer, buttons, preventClose }) {
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
    <View className="w-full h-full p-4">
      <View className={`modal-header fixed top-0 w-full left-0 p-4 bg-background h-24`}>
        <CUHeading>{title}</CUHeading>
        {subtitle && <CUText className="text-lg mb-4">{subtitle}</CUText>}
        <View className="modal-toolbar absolute right-4 top-4 cursor-pointer z-[49] flex flex-row">
          {buttons}
          <CUIconButton icon={X} text="Close" onPress={closeModal} />
        </View>
      </View>
      <View className="modal-content mt-32 mb-24">{children}</View>

      <View className={`modal-footer bg-background z-[49]`}>{footer}</View>
    </View>
  );
}
