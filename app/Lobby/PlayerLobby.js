
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";
import {View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, off } from "firebase/database";
import { db } from "../../firebaseConfig";

export default function PlayerLobby ({navigation, route}) {
    const { gameID,gameSettings} = route.params;
    const [gameData, setGameData] = useState(gameSettings);
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
    return (
        <SafeAreaView style={ AndroidSafeView.AndroidSafeView }>
            <Text >Lobby for Game: {gameID}</Text>
            {gameData ? (
                <>
                    <Text>Difficulty: {gameData.difficulty}</Text>
                    <Text>Duration: {gameData.duration}</Text>
                    <Text>Players: {gameData.nrOfPlayers}</Text>
                </>
            ) : (
                <Text>Loading game data...</Text>
            )}
        </SafeAreaView>
    )
}