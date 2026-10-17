import {Platform, StatusBar, StyleSheet} from "react-native";

export const AndroidSafeView = StyleSheet.create({
    AndroidSafeView: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})