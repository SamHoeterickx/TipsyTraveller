import React, { useState, useRef, useEffect } from 'react';
import {
    TextInput,
    StyleSheet,
    View
} from 'react-native';

export default function InputField({ placeholder, value, setValue }) {


    const handleChange = (text) => {
        // Allow only digits
        setValue(text);
    };

    return (
        <View style={styles.inputfieldContainer}>
            <TextInput
                style={styles.inputfield}
                value={value}
                placeholder={placeholder}
                onChangeText={handleChange}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputfieldContainer: {
        backgroundColor: "#D9D9D9",
        paddingVertical: 25,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    inputfield: {
        width: "60%",
        fontSize: 18,
        textAlign: "center",
        fontFamily: "dogicapixelbold",
        placeholderLetterSpacing: 0,
        letterSpacing: 0,
    }
});