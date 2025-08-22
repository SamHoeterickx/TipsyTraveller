import { TouchableOpacity, Text, StyleSheet } from "react-native"

export default function BackButton ({ navigation }) {

    return(
         <TouchableOpacity style={ styles.buttonContainer } onPress={ () => navigation.goBack() }>
            <Text style={ styles.buttonText }>Back</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#C4C4C4",
        width: "12%",
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 20,
    },
    buttonText: {
        color: "black",
        fontSize: 10,
        fontWeight: "bold",
        fontFamily: "dogicapixel",
    },
})