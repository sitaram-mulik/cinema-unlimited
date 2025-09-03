import React from "react";
import { View, TouchableOpacity, StatusBar, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryNav from "./CategoryNav";
import { CUText } from "./utilities/CUText";
import { useRouter, useSegments } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { isWeb, PRODUCT_NAME } from "../config/constant";

export default function Header() {
  const router = useRouter();
  const segments = useSegments();
  const isHome = segments.length === 0;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="absolute top-0 left-0 right-0 z-10 w-[98%] m-auto bg-background"
    >
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center">
            {isHome || isWeb ? (
              <CUText className="text-base font-bold mr-6">
                {PRODUCT_NAME}
              </CUText>
            ) : (
              <TouchableOpacity onPress={() => router.back()}>
                <ArrowLeft color={"white"} size={24} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={() => router.push("/account")}>
            <Ionicons name="person-circle-outline" size={32} color="white" />
          </TouchableOpacity>
        </View>
        {/* {(isHome || isWeb) && <CategoryNav />} */}
      </View>
    </SafeAreaView>
  );
}
