import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LowerButtonContainer ({ LeftButtonVisible, LeftButtonCopy, handleLeftButton, RightButtonCopy, handleRightButton }) {

    const style = StyleSheet.create({
        container: {
            width: "90%",
            flexDirection: "row",
            justifyContent: LeftButtonVisible ? "flex-between" : "flex-end"
        },
        buttonLeftContainer: {
            width: "40%",
            backgroundColor: "red"
        },  
        buttonRightContainer: {
            width: "40%",
            alignItems: "flex-end",
    
            backgroundColor: "orange"
        },
        button: {
            // width: 100,
            // height: 100,
            // borderRadius: 50,
            // backgroundColor: "#FFF1CD",
            // borderWidth: 1,
            // borderColor: "#2C3E50"
        }
    })

    return(
        <View style={ style.container}>
            {
                LeftButtonVisible &&
                <View style={ style.buttonLeftContainer}>
                    <Pressable 
                        style={ style.button }
                        onPress={ handleBackButton }
                    >
                        <Text>
                            { LeftButtonCopy }
                        </Text>
                    </Pressable>
                </View>
            }
            <View style={ style.buttonRightContainer}>
                <Pressable 
                    style={ style.button }
                    onPress={ handleRightButton }
                >
                    <Text>
                        { RightButtonCopy }
                    </Text>
                </Pressable>
            </View>
        </View>
    )
} 

