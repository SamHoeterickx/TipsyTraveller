import { SafeAreaView } from "react-native-safe-area-context";
import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
//COMPONENTS
import TeamContainer from "./components/TeamContainer";
import LowerButtonContainer from "../shared/components/LowerButtonContainer/LowerButtonContainer";
import InputField from "../shared/components/InputField/InputField";
//FIREBASE
import {set, ref,push, onValue, off } from "firebase/database";
import { db } from "../../firebaseConfig";
//STYLES
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";
import BackButton from "../shared/components/BackButton/BackButton";

export default function Lobby ({ navigation, route }) {
    const { gameID,isHost,hostName,gameSettings} = route.params;
    const [gameData, setGameData] = useState(gameSettings);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const game = ref(db, `games/${gameID}`);
        const unsubscribe = onValue(game, (snapshot) => {
            if (snapshot.exists) {
                setGameData(snapshot.val());
            }else {
                console.log("No such game found");
            }
        });
        return () => off(game);
    }, [gameID]);
    const handleAddPlayer  = async () => {
        const playersRef = ref(db, `players/${gameID}`);
        push(playersRef, userName);
        setUserName("");
    }
    const handleBackButton = () => {
        console.log("back");
    }
    const handleNextButton = () => {
        console.log("back");
    }

    return (
        <SafeAreaView style={[ style.mainContainer, AndroidSafeView.AndroidSafeView]}>
            <View style={ style.upperContainer }>
                <BackButton navigation={ navigation }/>
                <View style={ style.gamePinContainer}>
                    <Text style={ style.gamePinText }>
                       { `GAME ID` }
                    </Text>
                    <Text style={ style.gamePinText }>
                       { `${gameID}` }
                    </Text>
                </View>
            </View>

            <View style={ style.teamContainerWrapper }>
                <TeamContainer
                    index={ 1 }
                />
                <TeamContainer
                    index={ 2 }
                />
                <TeamContainer
                    index={ 3 }
                />
                
            </View>
            {isHost && (
                <View style={ style.inputContainer}>
                    {/*<Text style={ style.inputLabel }>ENTER USERNAME</Text>*/}
                    <View style={ style.inputField }>
                        <InputField
                            placeholder="ADD PLAYERS"
                            value={ userName }
                            setValue={ setUserName }
                        />
                    </View>
                    <View style={ style.deleteButton }>
                        <TouchableOpacity onPress={handleAddPlayer}>
                            <Text style={ style.plusIcon }>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            <LowerButtonContainer 
                LeftButtonVisible={ true }
                LeftButtonCopy={ "RULES" }
                handleLeftButton={ handleBackButton }
                RightButtonCopy={ "START" }
                handleRightButton={ handleNextButton }
            />
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        backgroundColor: "#FAF3E0",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    upperContainer: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    gamePinContainer: {
        justifyContent: "flex-end",
        marginTop: 10
    },
    gamePinText: {
        textAlign: "right",
        fontFamily: "dogicapixel",
        marginBottom: 10,
        fontSize: 18,
    },
    teamContainerWrapper: {
        width: "100%",
        flex:1,
    },
    inputContainer: {
        width: "100%",
        paddingHorizontal: 20,
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        height: "10%",
    },

    inputField: {
        marginRight: 10,
        width: "90%",
        height: "100%",
    },

    deleteButton: {
        backgroundColor: "#1BA39C",
        width: "20%",
        height: "70%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
    },

    plusIcon: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "bold"
    }
})