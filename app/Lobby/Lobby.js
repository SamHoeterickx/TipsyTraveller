import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet, View } from "react-native";

//COMPONENTS
import TeamContainer from "./components/TeamContainer";
import LowerButtonContainer from "../shared/components/LowerButtonContainer/LowerButtonContainer";

//STYLES
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";
import BackButton from "../shared/components/BackButton/BackButton";

export default function Lobby ({ navigation }) {

    const GAMEPIN = "123456";
    
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
                       { `${GAMEPIN}` }
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
        height: "80%"
    }
})