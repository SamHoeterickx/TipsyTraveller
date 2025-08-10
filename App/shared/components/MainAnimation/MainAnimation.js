import { StyleSheet, Text, View, Image } from "react-native";

export default function MainAnimation () {
    
    
    return(
        <View style={ style.animationContainer }>
            <Image
                style={ style.animationImage }
                source={ require("../../../../assets/images/temp-animation.png")}
            />
            <Text style={ style.appName }>TIPSY TRAVELLERS</Text>
        </View>
    )
}

const style = StyleSheet.create({
    animationContainer: {
        width:"80%",
        marginBottom: 10,
        alignItems: "center",
    },
    animationImage: {
        width: "80%",
        resizeMode: "contain",
        marginBottom: 40,
        marginTop: 20
    },
    appName: {
        fontSize: 50,
        textAlign: "center",
    }
})