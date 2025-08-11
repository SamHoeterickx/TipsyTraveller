import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//SCREENS
import Home from '../home/home';
import SelectionPages from '../CreateGame/CreateGame';
import JoinGame from "../JoinGame/JoinGame"

const Stack = createStackNavigator();

export default function App() {
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
          name="JoinGameScreen"
          component={ JoinGame }
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}