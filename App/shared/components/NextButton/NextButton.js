import { Pressable, StyleSheet, Text } from "react-native";

export default function NextButton () {

    return(
        <Pressable style={ style.buttonContainer }>
            <Text>
                Next
            </Text>
        </Pressable>
    )
} 

const style = StyleSheet.create({
    buttonContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FFF1CD",
        borderWidth: 1,
        borderColor: "#2C3E50"
    }
})