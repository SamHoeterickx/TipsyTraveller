import { Text, View } from "react-native"

//STYLES
import { baseStyles } from "../shared/styles/variables"

export default function Home () {
    return (
        <View style={baseStyles.container}>
            <Text style={baseStyles.headingOne}>
                Tipsy negers
            </Text>
        </View>
    )
}