import { SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";

//COMPONENTS
import Button from "../shared/components/Button/Button"
import Header from "../shared/components/Header/Header";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import InputField from "../shared/components/InputField/InputField";
import NumberInput from "../shared/components/NumberInput/NumberInput";

//STYLE
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";

export default function JoinGame ({ navigation }) {
    const [gamePin, setGamePin] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        console.log(gamePin, userName);
    }, [gamePin, userName]);

    const handleJoin = () => {
        if (userName === "") {
            return;
        }else if (gamePin === "") {
            return;
        }else {

        }
    }

    return(
        <SafeAreaView style={[ style.mainContainer, AndroidSafeView.AndroidSafeView]}>
            <Header
                showBackButton={ true }
                navigation={ navigation }
            />
            <MainAnimation />


            <View style={ style.lowerContainer }>
                <View style={ style.inputContainer}>
                    <Text style={ style.inputLabel }>ENTER GAME PIN</Text>
                    <NumberInput
                        placeholder="GAME PIN"
                        value={ gamePin }
                        setValue={ setGamePin }
                    />
                </View>
                <View style={ style.inputContainer}>
                    <Text style={ style.inputLabel }>ENTER USERNAME</Text>
                    <InputField
                        placeholder="USERNAME "
                        value={ userName }
                        setValue={ setUserName }
                    />
                </View>

                <Button
                    buttonCopy={ 'Join' }
                    handlePress={ handleJoin }
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
    lowerContainer:{
        height: "50%",
        width: "90%"
    },
    inputContainer: {
        paddingBottom: 35,
    },
    inputLabel: {
        fontSize: 18,
        textTransform: "uppercase",
        fontFamily: "dogicapixel",
        borderBottomColor:  "#000",
        borderBottomWidth: 1,
        paddingBottom: 5,
    },

})

