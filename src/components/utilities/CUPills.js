import { TouchableOpacity, View } from 'react-native';
import { isMobile } from '../../config/constant';
import { CUText } from './CUText';

export default function CUPills({ items, selectedItem, setSelectedItem, radio, title }) {
  const onPillPress = item => {
    if (item.route) {
      router.push(item.route);
    } else if (radio) {
      setSelectedItem(item);
    } else {
      const pillIndex = selectedItem?.findIndex(i => i === item);
      if (pillIndex > -1) {
        const updated = [...selectedItem];
        updated.splice(pillIndex, 1);
        setSelectedItem(updated);
      } else {
        const prevItems = selectedItem ? [...selectedItem] : [];
        setSelectedItem([...prevItems, item]);
      }
    }
  };
  return (
    <View>
      {title && <CUText className="mb-2 text-lg">{title}</CUText>}
      <View className="flex-row items-center flex-wrap">
        {items.map(item => {
          return (
            <TouchableOpacity key={item} onPress={() => onPillPress(item)}>
              <CUText
                className={`text-md rounded-full border border-primary px-2 py-1 mr-3 mb-3 ${selectedItem === item || (selectedItem?.find && selectedItem?.find(s => s === item)) ? 'bg-primary text-secondary border-secondary' : ''}`}
              >
                {item}
              </CUText>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
