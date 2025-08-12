import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

//COMPONENTS
import Header from "../shared/components/Header/Header";
import MainAnimation from "../shared/components/MainAnimation/MainAnimation";

//STYLE
import { AndroidSafeView } from "../shared/styles/SafeAreaView/SafeAreaView";

export default function JoinGame ({ navigation }) {
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
                    <View style={ style.inputfieldContainer }>
                        <TextInput
                            style={ style.inputfield }
                        />
                    </View>
                </View>
                <View style={ style.inputContainer}>
                    <Text style={ style.inputLabel }>ENTER GAME PIN</Text>
                </View>
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
    inputfieldContainer: {
        backgroundColor: "gray"
    },
    inputfield: {
        width: "60%"
    }

})