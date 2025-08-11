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

    const difficultySettings = {
        setting: "difficulty",
        titles: ["EASY", "MEDIUM", "HARD"],
        options: ["easy", "medium", "hard"],
        imgPathOptions: [difficultyEasyImage, difficultyMediumImage, difficultyHardImage],
        gameSettings,
        setGameSettings
    };
      
      const durationSettings = {
        setting: "duration",
        titles: ["EASY", "MEDIUM", "HARD"],
        options: ["easy", "medium", "hard"],
        imgPathOptions: [" require('../../assets/images/3beers-flesje.png')", " require('../../assets/images/3beers-flesje.png')", " require('../../assets/images/3beers-flesje.png')"],
        gameSettings,
        setGameSettings
      };
      
      const playersSettings = {
        setting: "nrOfPeople",
        titles: ["EASY", "MEDIUM", "HARD"],
        options: ["easy", "medium", "hard"],
        imgPathOptions: [" require('../../assets/images/3beers-flesje.png')", " require('../../assets/images/3beers-flesje.png')", " require('../../assets/images/3beers-flesje.png')"],
        gameSettings,
        setGameSettings
      };

    return(
        <SafeAreaView style={[style.mainContainer, AndroidSafeView.AndroidSafeView]}>
            <MainAnimation />

            {/* <GameSettingOptionContainer
                setting={ "difficulty" }
                titleOne={ "EASY" }
                titleTwo={ "MEDIUM" }
                titleThree={ "HARD" }
                optionOne={ "easy"}
                optionTwo={ "medium" }
                optionThree={ "hard" }
                imgPathOptionOne={ require('../../assets/images/3beers-flesje.png') }
                imgPathOptionTwo={ require('../../assets/images/3beers-flesje.png') }
                imgPathOptionThree={ require('../../assets/images/3beers-flesje.png') }
                gameSettings={ gameSettings }
                setGameSettings={ setGameSettings }
            /> */}

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