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

export default function JoinGame ({ navigation }) {
    const [gamePin, setGamePin] = useState('');
    const [userName, setUserName] = useState('');
    const isHost = false;
    useEffect(() => {
        console.log(gamePin, userName);
    }, [gamePin, userName]);

    const handleJoin = async () => {
         let gameExists = false;
        if (userName === ""|| gamePin === "" ){
            return;
        }else {
            const snapshot = await get(child(ref(db),`games/${gamePin}`));

            if(snapshot.exists()){
                gameExists = true;
                const gameSettings = snapshot.val();
                console.log("game exists", gameSettings);
                await addPlayerToRightTeam(gameSettings);
                navigation.navigate( "LobbyScreen" , {gameID: gamePin, isHost: isHost, gameSettings});
            }
            else {
                console.log("game not found");
            }
        }
    }
    const  addPlayerToRightTeam = async (gameSettings) => {
        const playersRef = ref(db, `players/${gamePin}`);
        const snapshot = await get(playersRef);
        if(snapshot.exists()){
            const playerData = snapshot.val();
            if(gameSettings.nrOfPlayers === "1-4" || gameSettings.nrOfPlayers === "5-8" ){
                if(!playerData.team2){
                    await push(ref(db, `players/${gamePin}/team${2}`),userName);
                }
                else{
                    alert("Team 2 already filled");
                    //TODO zorg dat na alert je niet meer navigate naar de lobby
                }
            }
            else{
                if(!playerData.team2){
                    await push(ref(db, `players/${gamePin}/team${2}`),userName);
                }
                else if(!playerData.team3){
                    await push(ref(db, `players/${gamePin}/team${3}`),userName);
                }
                else{
                    alert("Teams already filled")
                }
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

