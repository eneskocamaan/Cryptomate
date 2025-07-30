import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from './HomeStackNavigator';
import FavoriteStackNavigator from './FavoritesStackNavigator';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName ="";

          if(route.name == "Home"){
            iconName = focused ? "home" : "home-outline"
          }else if(route.name == "Favorite"){
            iconName = focused ? "heart" : "heart-outline"
          }else if(route.name == "Settings"){
            iconName = focused ? "settings" : "settings-outline"
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#7C4DFF',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#131315',
          borderTopColor: '#222',
          paddingTop: 4,
        },
      })}
    >
      <Tab.Screen
      name = "Home"
      component={HomeStackNavigator}
      options={{headerShown:false}}
      />
      <Tab.Screen
      name = "Favorite"
      component={FavoriteStackNavigator}
      options={{headerShown:false}}
      />
      <Tab.Screen
      name = "Settings"
      component={SettingScreen}
      options={{headerShown:false}}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator