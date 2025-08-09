import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeStackNavigator from './HomeStackNavigator';
import FavoriteStackNavigator from './FavoritesStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName ="";

          if(route.name == "Ana Sayfa"){
            iconName = focused ? "home" : "home-outline"
          }else if(route.name == "Favoriler"){
            iconName = focused ? "heart" : "heart-outline"
          }else if(route.name == "Ara"){
            iconName = focused ? "search" : "search-outline"
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
      name = "Ana Sayfa"
      component={HomeStackNavigator}
      options={{headerShown:false}}
      />
      <Tab.Screen
      name = "Ara"
      component={SearchStackNavigator}
      options={{headerShown:false}}
      />
      <Tab.Screen
      name = "Favoriler"
      component={FavoriteStackNavigator}
      options={{headerShown:false}}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator