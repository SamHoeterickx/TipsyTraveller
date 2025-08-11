import React from "react";
import {TouchableOpacity, Text, StyleSheet, Image, View, Button} from 'react-native';
import { useState } from 'react';
import profileImage from "../../../../assets/images/profile-icon.png";
import SettingsIcon from "../../../../assets/images/settings-icon.png";
export default function Header ({showBackButton = false, navigation}) {
    const styles = StyleSheet.create({
        MainContainer: {

            alignItems: 'center',
            flexDirection: 'row',

            justifyContent: showBackButton === true ? "space-between" : "flex-end",
            width: '100%',
            height: 35,
        },
        icons: {
            flexDirection: 'row',
            marginRight: 20,
            gap:20,
        },
        image: {
            width: 35,
            height: 35,
        },
        buttonContainer: {
            backgroundColor: "#C4C4C4",
            width: "12%",
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
            marginLeft: 20,
        },
        buttonText: {
            color: "black",
            fontSize: 10,
            fontWeight: "bold",
            fontFamily: "dogicapixel",
        },
    })
    return (
        <View style={ styles.MainContainer }>

            {showBackButton && (
                <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            )}
            <View style={styles.icons}>
                <TouchableOpacity style={styles.profile}>
                    <Image source={profileImage} style={styles.image} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.settings}>
                    <Image source={SettingsIcon} style={styles.image} />
                </TouchableOpacity>
            </View>
        </View>

    );
}

