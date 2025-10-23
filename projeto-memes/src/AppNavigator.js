import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MemeScreen from './screens/MemeScreen';
import ResultScreen from './screens/ResultScreen';
import RankingScreen from './screens/RankingScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#121212' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Meme do Dia' }} />
      <Stack.Screen name="Meme" component={MemeScreen} options={{ title: 'Tente adivinhar!' }} />
      <Stack.Screen name="Result" component={ResultScreen} options={{ title: 'Resultado' }} />
      <Stack.Screen name="Ranking" component={RankingScreen} options={{ title: 'Seu Progresso' }} />
    </Stack.Navigator>
  );
}
