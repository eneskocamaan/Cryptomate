import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CoinDetailScreen from '../screens/CoinDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='CoinDetails'
        component={CoinDetailScreen}
        />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator