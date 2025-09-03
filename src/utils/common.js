import { View, Platform } from "react-native";

export const isMobile = () => !Platform.isTV && Platform.OS !== "web";

export const isWeb = () => Platform.isTV || Platform.OS === "web";
