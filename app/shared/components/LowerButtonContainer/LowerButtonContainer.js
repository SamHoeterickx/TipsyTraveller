import { Pressable, StyleSheet, Text, View } from "react-native";

export default function LowerButtonContainer ({ LeftButtonVisible, LeftButtonCopy, handleLeftButton, RightButtonCopy, handleRightButton }) {

    const style = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: "row",
            justifyContent: LeftButtonVisible === true ? "space-between" : "flex-end"
        },
        buttonLeftContainer: {
            width: "45%",
        },  
        buttonRightContainer: {
            width: "45%",
            alignItems: "flex-end",
        },
        button: {
            width: 170,
            height: 55,
            borderRadius: 50,
            backgroundColor: "#FFF1CD",
            borderWidth: 4,
            borderColor: "#2C3E50",
            alignItems: "center",
            justifyContent: "center"
        },
        buttonCopy: { 
            fontFamily: "dogicapixelbold",
            fontSize: 25
        }
    })

    return(
        <View style={ style.container}>
            {
                LeftButtonVisible &&
                <View style={ style.buttonLeftContainer}>
                    <Pressable 
                        style={ style.button }
                        onPress={ handleLeftButton }
                    >
                        <Text style={ style.buttonCopy }>
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
                    <Text style={ style.buttonCopy }>
                        { RightButtonCopy }
                    </Text>
                </Pressable>
            </View>
        </View>
    )
} 

