import { Button, SafeAreaView, Text } from "react-native"
import { useEffect, useState } from "react"

//STYLES
import { baseStyles } from "./shared/styles/variables"

export default function Home () {

    const [gameSettings, setGameSettings] = useState({
        difficulty: "",
        duration: "",
        nrOfPeople: "",
        persons: {}
    })

    const handleDiffuculty = ( difficulty ) => {
        setGameSettings({
            ...gameSettings,
            difficulty: difficulty
        })
    }

    const handleDuration = ( duration ) => {
        setGameSettings({
            ...gameSettings,
            duration: duration
        })
    }

    useEffect(() => {
        console.log(gameSettings)
    }, [gameSettings])

    return (
        <SafeAreaView style={baseStyles.container}>
            <Text style={baseStyles.headingOne}>
                Tipsy Travellers
                <Button
                    title="easy"
                    onPress={ () => handleDiffuculty("easy") }
                />
                <Button
                    title="Medium"
                    onPress={ () => handleDiffuculty("medium") }
                />
                <Button
                    title="hard"
                    onPress={ () => handleDiffuculty("hard") }
                />
            </Text>
        </SafeAreaView>
    )
}