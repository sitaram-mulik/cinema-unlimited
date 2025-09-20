import { X } from 'lucide-react-native';
import CUIconButton from './CUIconButton';
import { CUScrollContainer } from './CUScrollContainer';
import CUHeading from './CUHeading';
import { View } from 'react-native';
import { CUText } from './CUText';
import { useEffect } from 'react';
import { router } from 'expo-router';

export function CUModal({ title, subtitle, children, footer, preventClose }) {
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
    console.log('window.history ', window.history);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/'); // fallback to home
    }
  };
  return (
    <CUScrollContainer>
      <CUHeading>{title}</CUHeading>
      {subtitle && <CUText className="text-lg mb-4">{subtitle}</CUText>}
      <CUIconButton
        icon={X}
        className="absolute right-0 top-0 cursor-pointer z-50"
        onPress={closeModal}
      />
      {children}
      <View className={`modal-footer fixed bottom-0 w-full left-0 p-2 bg-background`}>
        {footer}
      </View>
    </CUScrollContainer>
  );
}
