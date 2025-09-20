import React, { createContext, useContext, useMemo } from 'react';
import Toast from 'react-native-toast-message';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const showToast = (text1, type = 'error', text2 = '') => {
    Toast.show({
      type,
      text1,
      text2,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 50
    });
  };

  const value = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast /> {/* mounted once */}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
