import { StyleSheet, Text, View, Image } from "react-native";
import LottieView from "lottie-react-native";
import React, {useRef, useEffect} from "react";
import { useFonts } from "expo-font";

export default function MainAnimation () {

    const animation = useRef(null);
    useEffect(() => {
        if (animation.current) {
            animation.current.play(45, 88);
        }
    }, []);

    const handleAnimationFinish = () => {
        if (animation.current) {
            animation.current.play(45, 88); // restart segment
        }
    };
    return(
        <View style={ style.animationContainer }>
            <View style={ style.animationImage }>
                <LottieView
                    autoPlay={false}
                    speed={0.4}
                    ref={animation}
                    onAnimationFinish={handleAnimationFinish}
                    style={{
                        width: 450,
                        height: 450,
                        marginHorizontal: -35,
                        marginVertical: -95,

                    }}
                    // Find more Lottie files at https://lottiefiles.com/featured
                    source={require('../../../../assets/animations/animatie-wereld.json')}
                />
            </View>

            <Text style={ style.appName }>TIPSY {"\n"} TRAVELLER</Text>
        </View>
    )
}

const style = StyleSheet.create({
    animationContainer: {
        width:400,
        height:400,
        overflow:"hidden",
        marginBottom: 0,
        alignItems: "center",

    },
    animationImage: {
        width: "80%",
        resizeMode: "contain",
        paddingVertical: -50,

    },
    appName: {
        color: "#393939",
        fontSize: 40,
        textAlign: "center",
        position: "absolute",
        bottom: 30,
        lineHeight: 50,
        fontFamily: "dogicapixelbold",

    }
})