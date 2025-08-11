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
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        width: 10,
        height: 10,
    }
})