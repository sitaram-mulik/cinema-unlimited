import { useEffect, useState } from 'react';
import { View } from 'react-native';

const baseColor = '4, 8, 31';

export default function VideoOverlay({ children, direction = 'left', hideAfter = 10000 }) {
  const [hideDesc, setHideDesc] = useState(false);
  // useEffect(() => {
  //   if (hideAfter) {
  //     const t = setTimeout(() => {
  //       setHideDesc(true);
  //     }, hideAfter);
  //     return () => clearTimeout(t);
  //   }
  // }, [hideAfter, setHideDesc]);

  if (hideDesc) return;

  if (direction === 'bottom') {
    return (
      <View
        className="title-overlay w-full absolute z-[49] bottom-0 left-0 flex align-start justify-end"
        style={{
          pointerEvents: 'none',
          height: '20%',
          background: `linear-gradient(180deg,rgba(${baseColor}, 0) 0%, rgba(${baseColor}, 0.9) 80%, rgba(${baseColor}, 1) 100%)`,
          paddingLeft: '5%',
          paddingBottom: '10%'
        }}
      >
        {children}
      </View>
    );
  }

  return (
    <View
      className="title-overlay w-1/3 absolute z-2 bottom-0 left-0 flex align-start justify-end"
      style={{
        pointerEvents: 'none',
        height: '100%',
        background: `linear-gradient(90deg,rgba(${baseColor}, 0.7) 0%, rgba(${baseColor}, 0.6) 25%, rgba(${baseColor}, 0.5) 50%, rgba(${baseColor}, 0.4) 60%, rgba(${baseColor}, 0.3) 70%, rgba(${baseColor}, 0.2) 80%, rgba(${baseColor}, 0) 100%)`,
        paddingLeft: '2.5%',
        paddingBottom: '5%'
      }}
    >
      {children}
    </View>
  );
}
