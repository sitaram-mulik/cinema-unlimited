import { View } from "react-native";
import { CUText } from "./CUText";

export default function CUError({ error }) {
  return (
    <View className="h-48 justify-center items-center">
      <CUText className="text-red-500 text-lg">{error}</CUText>
    </View>
  );
}
