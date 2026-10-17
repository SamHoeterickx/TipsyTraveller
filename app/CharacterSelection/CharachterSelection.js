import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {Suspense,useEffect, useState, useRef, useMemo} from "react";
import {ref, set} from "firebase/database";
import {Canvas, useFrame} from "@react-three/fiber/native";
import {useGLTF} from "@react-three/drei/native";
import { db } from "../../firebaseConfig";

import AsyncStorage from "@react-native-async-storage/async-storage";
//COMPONENTS
import Button from "../shared/components/Button/Button"
import Header from "../shared/components/Header/Header";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";
import InputField from "../shared/components/InputField/InputField";
import NumberInput from "../shared/components/NumberInput/NumberInput";
import { MODEL_OPTIONS } from "../GameScreen/constants/modelOptions";

//STYLE
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";



export default function CharacterSelection ({ navigation, route }) {
    const { gameID, gameData,teamMembers } = route.params;
    const [isTeamLeader, setIsTeamLeader] = useState(false);
    const [playerTeam, setPlayerTeam] = useState(null);
    const [selectedModelIndex, setSelectedModelIndex] = useState(0);
    const selectedModel = MODEL_OPTIONS[selectedModelIndex];

    useEffect(() => {
        MODEL_OPTIONS.forEach((model) => {
            useGLTF.preload(model.source);
        });
    }, []);

    const handlePreviousModel = async () => {
    
        setSelectedModelIndex(previousIndex => {
            if (previousIndex === 0) {
                return MODEL_OPTIONS.length - 1
            } else {
                return previousIndex - 1;
            }
        });
    }

    const handleNextModel = async () => {
        setSelectedModelIndex(previousIndex => {
            if (previousIndex === MODEL_OPTIONS.length - 1) {
                return 0
            } else {
                return previousIndex + 1;
            }
        });
    }

    const handleConfirm = async () => {
        if (!playerTeam) {
            alert("You must be assigned to a team before confirming your character.");
            return;
        }
        await set(ref(db, `games/${gameID}/teamModels/${playerTeam}`), selectedModel.id);

        navigation.replace("GameScreen", {
            gameID,
            gameData: {
                ...gameData,
                teamModels: {
                    ...(gameData?.teamModels || {}),
                    [playerTeam]: selectedModel.id,
                },
            },
            teamMembers,
        });
    }

        useEffect(() => {
            const checkIfLeader = async () => {
                const deviceID = await AsyncStorage.getItem("deviceID");
                if (!deviceID) return;
                let foundTeamLeader = false;
                let foundTeamKey = null;
                ["team1", "team2", "team3"].forEach((teamKey) => {
                    const team = teamMembers[teamKey];
                    if (team) {
                        Object.values(team).forEach(player => {
                            if (player.deviceID === deviceID && player.isLeader) {
                                foundTeamLeader = true;
                                foundTeamKey = teamKey; // Store the team key for later use
                            }
                        });
                    }
                });
                setPlayerTeam(foundTeamKey); // Set the player's team based on the found team key
                setIsTeamLeader(foundTeamLeader);
            };
            checkIfLeader();
        }, [teamMembers]);
                  
    return(

        <SafeAreaView style={[ style.mainContainer, AndroidSafeView.AndroidSafeView]}>
            <Header
                showBackButton={ true }
                navigation={ navigation }
            />
            <MainAnimation />

            <View style={ style.lowerContainer }>
                {isTeamLeader ? (
                    <>
                        <View style={style.modelPreview}>
                            <Canvas camera={{ position: [0, 1.2, 4], fov: 45 }}>
                                <ambientLight intensity={0.8} />
                                <directionalLight position={[4, 4, 4]} intensity={1.2} />

                                <Suspense fallback={<Text style={{color: "#fff"}}>Loading model...</Text>}>
                                    <CharacterModelPreview model={selectedModel} />
                                </Suspense>
                            </Canvas>
                        </View>

                        <View style={style.selectorContainer}>
                            <TouchableOpacity onPress={handlePreviousModel} style={style.arrowButton}>
                                <Text style={style.arrowText}>{"<"}</Text>
                            </TouchableOpacity>

                            <Text style={style.modelName}>{selectedModel.label}</Text>


                            <TouchableOpacity onPress={handleNextModel} style={style.arrowButton}>
                                <Text style={style.arrowText}>{">"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleConfirm} style={style.confirmButton}>
                                <Text style={style.confirmText}>CONFIRM</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={ style.inputLabel }>Waiting for teamleader...</Text>
                )}
            </View>
        </SafeAreaView>
    )
}

function CharacterModelPreview({ model }) {
    console.log("Rendering model preview for:", model.label);
    const groupRef = useRef();
    const { scene } = useGLTF(model.source);
    const clonedScene = useMemo(() => scene.clone(true), [scene]);
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.5; // Rotate the model around the Y-axis
        }
    });
    return (
        <group ref={groupRef} >
            <primitive object={clonedScene} scale = {[0.2, 0.2, 0.2]} position = {[0, -0.6, 0]}/>

        </group>
    );
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
    modelPreview: {
    flex: 1,
    width: "100%",
    },

    selectorContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 50,
    },

    arrowButton: {
        width: 55,
        height: 55,
        borderRadius: 8,
        backgroundColor: "#1BA39C",
        alignItems: "center",
        justifyContent: "center",
    },

    arrowText: {
        color: "#fff",
        fontSize: 28,
        fontFamily: "dogicapixelbold",
    },

    modelName: {
        minWidth: 170,
        textAlign: "center",
        fontSize: 16,
        fontFamily: "dogicapixel",
    },

})
