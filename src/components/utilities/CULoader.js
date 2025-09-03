import { ActivityIndicator, View } from "react-native";

export default function CULoader() {
  return (
    <View className="h-48 justify-center items-center">
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
}
