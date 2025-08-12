import { View, StyleSheet, Image, Text, SafeAreaView , TouchableOpacity} from "react-native";
import { useEffect, useState } from "react";

//COMPONENTS
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import GameSettingOptionContainer from "./components/GameSettingOptionContainer";
import {AndroidSafeView} from "../shared/styles/SafeAreaView/SafeAreaView";
import Header from "../shared/components/Header/Header";
//IMAGES
import difficultyEasyImage from "../../assets/images/beer-flesje.png"
import difficultyMediumImage from "../../assets/images/2beers-flesje.png"
import difficultyHardImage from "../../assets/images/3beers-flesje.png";
import LowerButtonContainer from "../shared/components/LowerButtonContainer/LowerButtonContainer";

//TYPE
/**
 * @typedef { Object } GameSettingOption
 * @property { string } setting
 * @property { string[] } titles 
 * @property { (string|number)[] } options 
 * @property { any[] } imgPathOptions 
 * @property { Object } gameSettings 
 * @property { Function } setGameSettings 
 */

export default function SelectionPages ({ navigation }) {

    const [currentSetting, setCurrentSetting] = useState("difficulty")
    const [gameSettings, setGameSettings] = useState({
        difficulty: "",
        duration: "",
        nrOfPlayers: "",
        persons: {}
    })

    useEffect(() => {
        console.log(currentSetting)
    }, [currentSetting])

    useEffect(() => {
        console.log(gameSettings)
    }, [gameSettings])

    const handleNextSetting = () => {

        if(currentSetting === "difficulty" && gameSettings.difficulty !== ""){
            setCurrentSetting("duration")
        }else if(currentSetting === "duration" && gameSettings.duration !== ""){
            setCurrentSetting("nrOfPlayers")
        }else if(currentSetting === "nrOfPlayers" && gameSettings.nrOfPlayers !== ""){
            navigation.navigate( "LobbyScreen" );
        }
        
    }

    const handleBackButton = () => {
        navigation.goBack();
    }

    /** @type {GameSettingOption} */
    const difficultySettings = {
        setting: "difficulty",
        titles: ["EASY", "MEDIUM", "HARD"],
        options: ["easy", "medium", "hard"],
        imgPathOptions: [difficultyEasyImage, difficultyMediumImage, difficultyHardImage],
        gameSettings,
        setGameSettings
    };

    /** @type {GameSettingOption} */
    const durationSettings = {
        setting: "duration",
        titles: ["SHORT", "MEDIUM", "LONG"],
        options: ["short", "medium", "long"],
        imgPathOptions: [difficultyEasyImage, difficultyMediumImage, difficultyHardImage],
        gameSettings,
        setGameSettings
    };

    /** @type {GameSettingOption} */
    const playerSettings = {
        setting: "nrOfPlayers",
        titles: ["1-4", "4-8", "8-12"],
        options: ["1-4", "4-8", "8-12"],
        imgPathOptions: [difficultyEasyImage, difficultyMediumImage, difficultyHardImage],
        gameSettings,
        setGameSettings
    };

    return(
        <SafeAreaView style={[style.mainContainer, AndroidSafeView.AndroidSafeView]}>
            <Header 
                navigation={ navigation } 
                showBackButton={ false }
            />
            <MainAnimation />

            {
                currentSetting === "difficulty" ? (
                    <GameSettingOptionContainer GameSettingOption={ difficultySettings } />
                ) : currentSetting === "duration" ? (
                    <GameSettingOptionContainer GameSettingOption={ durationSettings } />
                ) : (
                    <GameSettingOptionContainer GameSettingOption={ playerSettings } />
                )
            }

            <LowerButtonContainer 
                LeftButtonVisible={ true }
                LeftButtonCopy={ "<-" }
                handleLeftButton={ handleBackButton }
                RightButtonCopy={ "->" }
                handleRightButton={ handleNextSetting }
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FAF3E0",
        height: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#FFF1CD",
        borderWidth: 1,
        borderColor: "#2C3E50"
    }
})