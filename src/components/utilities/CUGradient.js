import { LinearGradient } from 'expo-linear-gradient';

export default function CUGradient() {
  return (
    <LinearGradient
      colors={['rgba(0,0,0,0.8)', 'transparent']}
      style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: '40%' }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />
  );
}
