import React from "react";
import {TouchableOpacity, Text, StyleSheet, Image, View, Button} from 'react-native';

//COMPONENTS
import BackButton from "../BackButton/BackButton";

//IMAGES
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
            paddingHorizontal: 20
        },
        icons: {
            flexDirection: 'row',
            gap:20,
        },
        image: {
            width: 35,
            height: 35,
        },
    })

    return (
        <View style={ styles.MainContainer }>

            {showBackButton && (
               <BackButton 
                navigation={ navigation }
               />
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

