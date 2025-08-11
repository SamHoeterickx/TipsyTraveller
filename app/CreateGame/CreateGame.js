import { View, StyleSheet, Image, Text, SafeAreaView , Pressable} from "react-native";
import { useEffect, useState } from "react";

//COMPONENTS
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import GameSettingOptionContainer from "./components/GameSettingOptionContainer";
import {AndroidSafeView} from "../shared/styles/SafeAreaView/SafeAreaView";
//IMAGES
import difficultyEasyImage from "../../assets/images/beer-flesje.png"
import difficultyMediumImage from "../../assets/images/2beers-flesje.png"
import difficultyHardImage from "../../assets/images/3beers-flesje.png";

//TYPE
/**
 * @typedef {Object} GameSettingOption
 * @property {string} setting
 * @property {string[]} titles 
 * @property {(string|number)[]} options 
 * @property {any[]} imgPathOptions 
 * @property {Object} gameSettings 
 * @property {Function} setGameSettings 
 */

export default function SelectionPages () {

    const [gameSettings, setGameSettings] = useState({
        difficulty: "",
        duration: "",
        nrOfPeople: "",
        persons: {}
    })

    const handleDifficulty = ( difficulty ) => {
        setGameSettings({
            ...gameSettings,
            difficulty: difficulty
        })
    }

    useEffect(() => {
        console.log(gameSettings)
    }, [gameSettings])


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
        titles: ["EASY", "MEDIUM", "HARD"],
        options: ["easy", "medium", "hard"],
        imgPathOptions: [difficultyEasyImage, difficultyMediumImage, difficultyHardImage],
        gameSettings,
        setGameSettings
    };

    /** @type {GameSettingOption} */
    const playerSettings = {
        setting: "nrOfPlayer",
        titles: ["1-4", "4-8", "8-12"],
        options: ["1-4", "4-8", "8-12"],
        imgPathOptions: [difficultyEasyImage, difficultyMediumImage, difficultyHardImage],
        gameSettings,
        setGameSettings
    };

    return(
        <SafeAreaView style={[style.mainContainer, AndroidSafeView.AndroidSafeView]}>
            <MainAnimation />

            <GameSettingOptionContainer
                GameSettingOption={ difficultySettings }
            />
            
            <Pressable style={ style.buttonContainer }>
                <Text>
                    Next
                </Text>
            </Pressable>
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