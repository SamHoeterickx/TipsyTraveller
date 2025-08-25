import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import Home from '../home/home';
import SelectionPages from '../CreateGame/CreateGame';
import JoinGame from "../JoinGame/JoinGame"
import {useFonts} from "expo-font";
import Lobby from '../Lobby/Lobby';
import playerLobby from "../Lobby/PlayerLobby";
import PlayerLobby from "../Lobby/PlayerLobby";
import HostName from "../HostName/HostName";

const Stack = createStackNavigator();

export default function App() {
  const [fontsloaded] = useFonts({
    "dogicapixelbold": require("../../assets/fonts/dogicapixelbold.otf"),
    "dogicapixel": require("../../assets/fonts/dogicapixel.otf"),
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={ Home }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateGameScreen"
          component={ SelectionPages }
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="HostName"
            component={ HostName }
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="JoinGameScreen"
          component={ JoinGame }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='LobbyScreen'
          component={ Lobby }
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlayerLobbyScreen"
          component={ PlayerLobby }
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}