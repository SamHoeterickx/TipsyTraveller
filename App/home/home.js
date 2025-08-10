import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import OptionButton from "./components/OptionButton/OptionButton";

//COMPONENTS

export default function Home ({ navigation }) {

    const handleNavigaiton = ( optionType ) => {
        navigation.navigate( optionType );
    }

    return(
        <SafeAreaView style={ style.mainContainer }>
            <MainAnimation />
            <Text style={ style.description }>Maak een roadtrip en ga skeftig zat</Text>
            <View style={ style.buttonContainer } >
                <OptionButton
                    ButtonCopy={ "CREATE GAME" }
                    onPress={() => handleNavigaiton('CreateGameScreen')}
                />
                <OptionButton
                    ButtonCopy={ "JOIN GAME" }
                    onPress={() => handleNavigaiton('JoinGameScreen')}
                />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FAF3E0",
        height: "100%",
        alignItems: "center"
    },
    buttonContainer: {
        width: "85%",
    },
    description: {
        color: "#000",
        fontSize: 25,
        width: "75%",
        textAlign: "center",
        marginBottom: 30
    }
})