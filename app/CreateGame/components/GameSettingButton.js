import { useState } from "react"
import { StyleSheet, View, Text, Pressable, Image } from "react-native";


export default function GameSettingButton({ title, setting, option, imgPath, gameSettings, setGameSettings }) {

    const handleButton = () => {
        if( setting === "difficulty"){
            setGameSettings({
                ...gameSettings,
                difficulty: option
            })
        }else if( setting === "duration"){
            setGameSettings({
                ...gameSettings,
                duration: option
            })
        }else {
            setGameSettings({
                ...gameSettings,
                nrOfPeople: option
            })
        }
        console.log(setting);
    }

    const isActive = gameSettings[setting] === option;

    return (
        <View >
            <Pressable
                onPress={ () => handleButton() }
                style={[
                    style.button,
                    isActive && style.buttonActive  
                ]}
            >
                <Image 
                    style={ style.buttonImage }
                    source={ imgPath}
                />
                <Text
                    style={style.buttonCopy}
                >{ title }</Text>
            </Pressable>
        </View>
    )
} 

const style = StyleSheet.create({
    button: {
        backgroundColor: "#FFFFFF",
        width: 105,
        height: 150,
        borderRadius: 12,
        color: "#000",
        justifyContent: "flex-end",
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        // Android Shadow
        elevation: 8,
    },
    buttonCopy: {
        paddingBottom: 10,
        fontWeight: 600
    },
    buttonActive: {
        backgroundColor: "#1BA39C"
    },
    buttonImage: {
        width: "70%",
        height: "40%",
        resizeMode: "contain",
        marginBottom: 20
    }
})