import { View, StyleSheet, Image, Text, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

//COMPONENTS
import GameSettingButton from "./components/GameSettingButton";
import NextButton from "../shared/components/NextButton/NextButton";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import GameSettingOptionContainer from "./components/GameSettingOptionContainer";

export default function SelectionPages () {

    const [gameSettings, setGameSettings] = useState({
        difficulty: "",
        duration: "",
        nrOfPeople: "",
        persons: {}
    })

    const handleDiffuculty = ( difficulty ) => {
        setGameSettings({
            ...gameSettings,
            difficulty: difficulty
        })
    }

    useEffect(() => {
        console.log(gameSettings)
    }, [gameSettings])

    return(
        <SafeAreaView style={style.mainContainer}>
            <MainAnimation />

            <GameSettingOptionContainer
                setting={ "difficulty" }
                titleOne={ "EASY" }
                titleTwo={ "MEDIUM" }
                TitleThree={ "HARD" }
                optionOne={ "easy"}
                optionTwo={ "medium" }
                optionThree={ "hard" }
                imgPath={ require('../../assets/images/3beers-flesje.png') }
                gameSettings={ gameSettings }
                setGameSettings={ setGameSettings }
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
})