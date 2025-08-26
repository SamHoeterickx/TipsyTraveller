import { SafeAreaView } from "react-native-safe-area-context";
import {Text, StyleSheet, View, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
//COMPONENTS
import TeamContainer from "./components/TeamContainer";
import LowerButtonContainer from "../shared/components/LowerButtonContainer/LowerButtonContainer";
import InputField from "../shared/components/InputField/InputField";
//FIREBASE
import {set, ref,push, onValue, off, get} from "firebase/database";
import { db } from "../../firebaseConfig";
//STYLES
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";
import BackButton from "../shared/components/BackButton/BackButton";

export default function Lobby ({ navigation, route }) {
    const { gameID,isHost,hostName,gameSettings} = route.params;
    
    const [gameData, setGameData] = useState(gameSettings);
    const [teamCounter, setTeamCounter] = useState(2);
    const [userName, setUserName] = useState('');
    const [teamMembers, setTeamMembers] = useState();
    const [inputVisibility, setInputVisibility] = useState(true);

    useEffect(() => {
        const players = ref(db, `players/${gameID}`);
        const subscribe = onValue(players, (snapshot) => {
            if (snapshot.exists) {
                setTeamMembers(snapshot.val());
                console.log(snapshot.val());
            }
            else {
                console.log("no Game found")
            }
        });

        return () => off(players);
    }, [gameID]);

    useEffect(() => {
        const game = ref(db, `games/${gameID}`);
        const unsubscribe = onValue(game, (snapshot) => {
            if (snapshot.exists) {
                //console.log(snapshot.val());
               setGameData(snapshot.val());
            }else {
                console.log("No such game found");
            }
        });

        return () => off(game);

    }, [gameID]);

    const handleAddPlayer  = async () => {
        const playersRef = ref(db, `players/${gameID}`);
        const snapshot = await get(playersRef);
        let currentCount = 0;
        if (snapshot.exists()) {
            const playersData = snapshot.val();
            Object.keys(playersData).forEach((key) => {
                if (key.startsWith("team")){
                    currentCount += Object.keys(playersData[key] || {}).length;
                }
            });
        }
        const newCount = currentCount + 1;
        await set(ref(db, `players/${gameID}/playerCounter`), newCount);
        const teamNr = giveTeamNr(newCount);
        await push(ref(db, `players/${gameID}/team${teamNr}`),userName);
        setUserName("");

    }

    const giveTeamNr = (playerCount) => {

        if (gameData.nrOfPlayers === "1-4" || gameData.nrOfPlayers === "4-8") {
            if(playerCount % 2 === 0){
                return 2;
            }
            else {
                return 1;
            }
        }
        if (gameData.nrOfPlayers === "8-12") {
            if(playerCount=== 3 || playerCount === 6|| playerCount===9 ||playerCount === 12){
                return 3;
            }
            else if (playerCount=== 2 || playerCount ===5|| playerCount===8 ||playerCount === 11){
                return 2;
            }
            else {
                return 1;
            }
        }
    }

    const handleBackButton = () => {
        console.log("back");
    }

    const handleNextButton = () => {
        console.log("next");
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
                    team={ teamMembers && teamMembers.team1 }
                    index={ 1 }
                />
                <TeamContainer
                    team={ teamMembers && teamMembers.team2 }
                    index={ 2 }
                />
                <TeamContainer
                    team={ teamMembers && teamMembers.team3 }
                    index={ 3 }
                />

                
            </View>

            {
                isHost && inputVisibility === true && (
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
                )
            }
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