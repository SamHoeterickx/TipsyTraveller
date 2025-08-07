import { View, StyleSheet, Image, Text } from "react-native";
import GameSettingButton from "./components/GameSettingButton";
import { useEffect, useState } from "react";

//COMPONENTS

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
        <View style={style.mainContainer}>
            <View style={ style.animationImg }>
                <Image
                    
                    source={ require("../../assets/images/temp-animation.png")}
                />
                <Text style={ style.appName }>TIPSY TRAVELLERS</Text>
            </View>

            <View>
                <View style={style.settingTitle}>
                    <Text style={ style.settingTitleTitle}>SELECT A DIFFICULTY</Text>
                </View>
                <View style={style.buttonContainer}>
                    <GameSettingButton
                        setting={"difficulty"}
                        title={ "EASY" }
                        option={ "easy"}
                        imgPath={ require('../../assets/images/beer-flesje.png') }
                        gameSettings={ gameSettings }
                        setGameSettings={ setGameSettings }
                    />
                    <GameSettingButton
                        setting={"difficulty"}
                        title={ "MEDIUM" }
                        option={ "medium"}
                        imgPath={ require('../../assets/images/2beers-flesje.png') }
                        gameSettings={ gameSettings }
                        setGameSettings={ setGameSettings }
                    />
                    <GameSettingButton
                        setting={"difficulty"}
                        title={ "HARD" }
                        option={ "hard"}
                        imgPath={ require('../../assets/images/3beers-flesje.png') }
                        onPressFunction={ () => handleDiffuculty("hard")}
                        gameSettings={ gameSettings }
                        setGameSettings={ setGameSettings }
                    />
                </View>
            </View>


            
        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FAF3E0",
        height: "100%",
        alignItems: "center",
    },
    buttonContainer: {
        width: "90%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    animationImg: {
        width:"80%",
        marginBottom: 50,
    },
    settingTitle: {
        paddingBottom: 5,
        borderBottomColor:  "#000",
        borderBottomWidth: 1,
    },
    settingTitleTitle: {
        fontSize: 24
    },
    appName: {
        fontSize: 50,
        textAlign: "center",
    }
})