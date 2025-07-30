import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FavoriteScreen from '../screens/FavoriteScreen';
import CoinDetailScreen from '../screens/CoinDetailScreen';


const Stack = createNativeStackNavigator();

const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='FavoriteScreen'
        component={FavoriteScreen}
        options={{headerShown:false}}
        />
        <Stack.Screen
        name='CoinDetails'
        component={CoinDetailScreen}

        />
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigator