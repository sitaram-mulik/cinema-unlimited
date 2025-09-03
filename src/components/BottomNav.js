import { View, Text, TouchableOpacity } from "react-native";
import { Home, Upload } from "lucide-react-native";
import { useRouter, useSegments } from "expo-router";

export default function BottomNav() {
  const router = useRouter();
  const segments = useSegments(); // current route segments

  const tabs = [
    { label: "Home", icon: Home, route: "/" },
    { label: "Upload", icon: Upload, route: "/upload" },
  ];

  return (
    <View className="flex-row h-24 items-center justify-around px-4 pb-8">
      {tabs.map((tab) => {
        const isActive = segments[0] === tab.route.replace("/", "");
        const Icon = tab.icon;
        return (
          <TouchableOpacity
            key={tab.label}
            className="items-center"
            onPress={() => router.push(tab.route)}
          >
            <Icon color={isActive ? "white" : "gray"} size={24} />
            <Text
              className={`text-xs ${isActive ? "text-white" : "text-gray-400"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
