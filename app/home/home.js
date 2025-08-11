import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import OptionButton from "./components/OptionButton/OptionButton";
import ProfileButton from "../shared/components/ProfileIcon/ProfileButton";
//COMPONENTS

import {AndroidSafeView} from "../shared/styles/SafeAreaView/SafeAreaView";
export default function Home ({ navigation }) {

    const handleNavigaiton = ( optionType ) => {
        navigation.navigate( optionType );
    }

    return(
        <SafeAreaView style={ [style.mainContainer, AndroidSafeView.AndroidSafeView] }>
            <ProfileButton/>
            <MainAnimation />
            <Text style={ style.description }>Take a roadtrip and drink your way to victory!</Text>
            <View style={ style.buttonContainer } >
                <OptionButton
                    ButtonCopy={ "CREATE GAME" }
                    onPress={() => handleNavigaiton('CreateGameScreen')}
                    color={'#1BA39C'}
                />
                <OptionButton
                    ButtonCopy={ "JOIN GAME" }
                    onPress={() => handleNavigaiton('JoinGameScreen')}
                    color={'white'}
                />
            </View>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FAF3E0",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonContainer: {
        width: "85%",
    },
    description: {
        color: "#393939",
        fontSize: 20,
        width: "75%",
        textAlign: "center",
        marginBottom: 30,
        marginTop: 1,
        fontFamily: "dogicapixel"
    }
})