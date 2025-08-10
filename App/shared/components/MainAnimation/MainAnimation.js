import { StyleSheet, Text, View } from "react-native";

export default function MainAnimation () {
    
    
    return(
        <View style={ style.animationContainer } >
            <Text style={ style.title } >TIPSY {"\n"} TRAVELLERS</Text>
        </View>
    )
}

const style = StyleSheet.create({
    animationContainer: {
        width: "100%",
        height: "50%",
        marginBottom: 10,
        justifyContent: "flex-end"
    },
    title: {
        color: "#000000",
        fontSize: 40,
        textAlign: "center"
    }

})