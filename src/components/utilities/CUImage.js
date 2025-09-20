import { isWeb } from '../../config/constant';
import { Image } from 'expo-image';

export default function CUImage({ imageUri, width, height, ...props }) {
  return (
    <Image
      source={{ uri: imageUri }}
      style={{ width, height }}
      className="border rounded-sm border-white"
      contentFit="cover" // instead of resizeMode
      {...props}
    />
  );
}

// <img
//   src={imageUri}
//   width={width}
//   height={height}
//   {...props}
//   className="border rounded-sm border-white"
//   contentFit="cover"
// />
