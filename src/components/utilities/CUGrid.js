import { FlatList, View, Image, Text, Pressable } from 'react-native';
import { CUText } from './CUText';
import CUHeading from './CUHeading';
import CUIcon from './CUICon';
import { CameraOff } from 'lucide-react-native';
import { getHorizontalAspectHeight } from '../../utils/common';
import { getThumbnailUrl } from '../../utils/video-player';
import { CUScrollContainer } from './CUScrollContainer';

export default function CUGrid({ data = [], numColumns = 4, itemWidth = 400, onItemPress, title }) {
  const itemHeight = getHorizontalAspectHeight(itemWidth);
  return (
    <View>
      {title && <CUHeading>{title}</CUHeading>}
      <CUScrollContainer>
        <View className="flex flex-wrap flex-row max-w-full justify-between">
          {data.map(item => {
            return (
              <View className="mb-6" key={item.guid}>
                <Pressable
                  className={`rounded-lg aspect-square border relative`}
                  style={{ width: itemWidth, height: `${itemHeight}px` }}
                  onPress={() => onItemPress && onItemPress(item)}
                >
                  <Image
                    source={{ uri: getThumbnailUrl(item.guid, item.thumbnailFileName) }}
                    className="h-full w-full relative z-50 top-0 left-0 rounded-lg relative z-50"
                    resizeMode="cover"
                  />
                  <View
                    className={`rounded-lg flex w-full h-full justify-center items-center bg-backgroundSecondary absolute top-0 left-0 opacity-70 z-49`}
                  >
                    <CUIcon icon={CameraOff} size={48} />
                  </View>
                </Pressable>
                <CUText className="mt-2 text-lg max-w-full overflow-hidden">{item.title}</CUText>
              </View>
            );
          })}
        </View>
      </CUScrollContainer>
    </View>
  );
}
