import { TouchableOpacity, View } from "react-native";
import { catNav, isMobile } from "../config/constant";
import { CUText } from "./utilities/CUText";
import { router } from "expo-router";

export default function CategoryNav() {
  return (
    <View className="flex-row items-center space-x-6">
      {catNav.map((navItem) => {
        return (
          <TouchableOpacity
            key={navItem.label}
            onPress={() => router.push(navItem.route)}
          >
            <CUText
              className={`text-${isMobile ? "md" : "lg"} ${isMobile && "rounded-full border border-white px-2 py-1 mr-3"} `}
            >
              {navItem.label}
            </CUText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
