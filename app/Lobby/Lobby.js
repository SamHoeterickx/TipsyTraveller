import { SafeAreaView } from "react-native-safe-area-context";
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";
import { Text } from "react-native";

export default function Lobby () {
    return (
        <SafeAreaView style={ AndroidSafeView.AndroidSafeView }>
            <Text>Lobby</Text>
        </SafeAreaView>
    )
}