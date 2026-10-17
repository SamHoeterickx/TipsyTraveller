import { Text, View, StyleSheet, TouchableOpacity} from "react-native";

export default function Button ({ handlePress, buttonCopy }) {
    return(
        <View style={ styles.container }>
            <TouchableOpacity
                style={ styles.button }
                onPress={ handlePress }
            >
                <Text style={ styles.buttonCopy }>
                    {  buttonCopy }
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        alingItems: "center",
        justifyContent: "center",
    },
    button: {
        width: 175,
        height: 55,
        borderRadius: 50,
        backgroundColor: "#FFF1CD",
        borderWidth: 4,
        borderColor: "#2C3E50",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonCopy: {
        fontFamily: "dogicapixelbold",
        fontSize: 25
    }

})