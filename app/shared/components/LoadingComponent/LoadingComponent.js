import React from "react";
import { Text, View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
 export default function LoadingComponent () {
     return (
         <View style={styles.animationContainer}>
             <LottieView
                 autoPlay
                 ref={animation}
                 style={{
                     width: 200,
                     height: 200,
                     backgroundColor: '#eee',
                 }}
                 // Find more Lottie files at https://lottiefiles.com/featured
                 source={require('assets/animations/splash-animation.json')}
             />

         </View>
     )
 }
const styles = StyleSheet.create({
    animationContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonContainer: {
        paddingTop: 20,
    },
});