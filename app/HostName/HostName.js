import { SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {ref, set, get, onDisconnect, child, push} from "firebase/database";
import { db } from "../../firebaseConfig";
//COMPONENTS
import Button from "../shared/components/Button/Button"
import Header from "../shared/components/Header/Header";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import InputField from "../shared/components/InputField/InputField";
import NumberInput from "../shared/components/NumberInput/NumberInput";

//STYLE
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";

export default function HostName ({ navigation, route }) {
    const [userName, setUserName] = useState('');
    const gameSettings = route.params;
    const isHost = true;
    useEffect(() => {
        //console.log( userName);
    }, [userName]);

    const handleCreate = async () => {
        let gameExists = false;
        if (userName === "" ){
            //TODO popup toevoegen
            return;
        }try {
            const newGameID = await generateUniqueGame(gameSettings);
            const playersRef = ref(db, `players/${newGameID}/team${1}`);
            push(playersRef, userName );
            navigation.navigate("LobbyScreen", {
                gameID: newGameID,
                isHost: isHost,
                hostName: userName,
                ...gameSettings,
            });
        } catch (error) {
            console.log("error creating game",error);
        }
    }
    const generateRandomNumber = () => {
        let code ="";
        for(let i =0;i<4; i++){
            code += Math.floor(Math.random() * (10));
        }
        return code;
    }
    const generateUniqueGame = async (gameSettings) => {
        let newGameID = generateRandomNumber();
        let gameExists = true;

        while(gameExists){
            const snapshot = await get(child(ref(db),`games/${newGameID}`));
            if(!snapshot.exists()){
                gameExists = false;
                await set(ref(db, `games/${newGameID}`),{
                    ...gameSettings,
                    HostName: userName,
                    createdAt: Date.now(),
                    status: "lobby"
                });
                return newGameID;
            }
            else {
                newGameID = generateRandomNumber();
            }
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
                    <Text style={ style.inputLabel }>ENTER USERNAME</Text>
                    <InputField
                        placeholder="USERNAME "
                        value={ userName }
                        setValue={ setUserName }
                    />
                </View>

                <Button
                    buttonCopy={ 'Create' }
                    handlePress={ handleCreate }
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
        paddingBottom: 50,
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

