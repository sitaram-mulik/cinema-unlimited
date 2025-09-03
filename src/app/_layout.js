import { Stack } from "expo-router";
import { View } from "react-native";
import Header from "../components/Header";

export default function Layout() {
  return (
    <View className="cu-container bg-background">
      <Header />

      <View
        className="px-4 text-base cu-stack h-full"
        style={{ marginTop: 130 }}
      >
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "#000" },
          }}
        />
      </View>
    </View>
  );
}
