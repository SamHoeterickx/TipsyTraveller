import { Text, View, StyleSheet } from 'react-native'

//COMPONENTS
import GameSettingButton from './GameSettingButton'

export default function GameSettingOptionContainer ({ titleOne, tilteTwo, TitleThree, setting, optionOne, optionTwo, optionThree, imgPath, gameSettings, setGameSettings }) {
    return(
        <View style={ style.optionContainer }>
            <View style={style.settingTitle}>
                <Text style={ style.settingTitleTitle}>SELECT { setting }</Text>
            </View>
            <View style={style.buttonContainer}>
                <GameSettingButton
                    setting={ setting }
                    title={ titleOne }
                    option={ optionOne}
                    imgPath={ imgPath }
                    gameSettings={ gameSettings }
                    setGameSettings={ setGameSettings }
                />
                <GameSettingButton
                    setting={"difficulty"}
                    title={ "MEDIUM" }
                    option={ "medium"}
                    imgPath={ require('../../../assets/images/3beers-flesje.png') }
                    gameSettings={ gameSettings }
                    setGameSettings={ setGameSettings }
                />
                <GameSettingButton
                    setting={"difficulty"}
                    title={ "HARD" }
                    option={ "hard"}
                    imgPath={ require('../../../assets/images/3beers-flesje.png') }
                    onPressFunction={ () => handleDiffuculty("hard")}
                    gameSettings={ gameSettings }
                    setGameSettings={ setGameSettings }
                />
            </View>
        </View>
    )
}



const style = StyleSheet.create({
    optionContainer: {
        marginTop: 40
    },
    buttonContainer: {
        width: "90%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30
    },
    settingTitle: {
        paddingBottom: 5,
        borderBottomColor:  "#000",
        borderBottomWidth: 1,
    },
    settingTitleTitle: {
        fontSize: 24,
        textTransform: "uppercase"
    },
})