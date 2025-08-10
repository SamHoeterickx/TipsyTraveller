import { Pressable, StyleSheet, Text,  } from "react-native";

export default function OptionButton ({ ButtonCopy }) {

    return(
        <Pressable style={ style.buttonContainer } >
            <Text style={ style.buttonCopy }>{ ButtonCopy }</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        backgroundColor: "#ffffff",
        alignItems: "center",
        justifyContent: "center",
        height: 125,
        borderRadius: 20,
        marginBottom: 20
    },
    buttonCopy: {
        color: "#000000",
        fontSize: 30,
        fontWeight: 600
    }
})