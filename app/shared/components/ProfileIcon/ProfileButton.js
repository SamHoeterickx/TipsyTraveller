import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import profileImage from "../../../../assets/images/profile-icon.png";
export default function ProfileButton () {
    return (
        <TouchableOpacity style={styles.container}>
            <Image source={profileImage} style={styles.image} />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        marginRight: 20,

    },
    image: {
        width: 35,
        height: 35,
    }
})