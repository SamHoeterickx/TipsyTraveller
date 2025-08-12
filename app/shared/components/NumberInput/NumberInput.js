import React, { useState, useRef, useEffect } from 'react';
import {
    TextInput,
    StyleSheet,
    View
} from 'react-native';

export default function NumberInput({ placeholder, value, setValue }) {

    const handleChange = (text) => {
        // Allow only digits
        const cleaned = text.replace(/[^0-9]/g, '').slice(0, 6);
        setValue(cleaned);
    };

    return (
        <View style={styles.inputfieldContainer}>
            <TextInput
                style={styles.inputfield}
                value={value}
                placeholder={placeholder}
                keyboardType={"numeric"}
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
        letterSpacing: 10,
        placeholderLetterSpacing: 0,
    }
});
