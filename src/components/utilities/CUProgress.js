import { View } from "react-native";
import { CUText } from "./CUText";

export default function CUProgress({ progress }) {
  return (
    <View>
      <View className="w-full h-4 bg-gray-700 rounded">
        <View
          className="h-4 bg-blue-600 rounded"
          style={{ width: `${Math.floor(progress * 100)}%` }}
        />
      </View>
      <CUText className="text-white mt-2">{Math.floor(progress * 100)}%</CUText>
    </View>
  );
}
