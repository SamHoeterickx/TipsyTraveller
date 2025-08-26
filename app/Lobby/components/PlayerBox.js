import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
export default function PlayerBox ({ name, onRemovePlayer, teamNr }) {
    const removePlayer = async () => {

    }
    return (
        <View style={ style.playerBoxContainer }>
            <Text style={ style.text }>
                { name }
            </Text>

            <View style={ style.removePlayerContainer }>
                <TouchableOpacity onPress={() => onRemovePlayer(teamNr, name)}>
                    <Text style={ style.text }>
                        X
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}  

const style = StyleSheet.create({
    playerBoxContainer: {
        backgroundColor: "rgba(247, 108, 94, .56)",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,

        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        fontFamily: "dogicapixel"
    },
    removePlayerContainer: {
        marginLeft: 10 
    },

})