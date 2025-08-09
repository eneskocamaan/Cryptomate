import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SearchScreen from '../screens/SearchScreen';
import CoinDetailScreen from '../screens/CoinDetailScreen';
import { HomeStackParamList } from './HomeStackNavigator';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CoinDetails"
        component={CoinDetailScreen}
        options={({ route }) => {
          const { id, name, image, symbol, price, change } = route.params;

          return {
            title: '',
            headerStyle: {
              backgroundColor: '#1A1A1D',
            },
            headerTintColor: '#fff',
            headerTitle: () => (
              <HeaderTitle
                id={id}
                name={name}
                image={image}
                symbol={symbol}
                change={change}
                price={price}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

const HeaderTitle = ({
  id,
  name,
  image,
  symbol,
  change,
  price,
}: {
  id: string;
  name: string;
  image: string;
  symbol: string;
  change: string;
  price: number;
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      const existing = await AsyncStorage.getItem('favorites');
      const favorites = existing ? JSON.parse(existing) : [];
      const exists = favorites.some((coin: any) => coin.id === id);
      setIsFavorite(exists);
    };
    checkFavorite();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      const existing = await AsyncStorage.getItem('favorites');
      const favorites = existing ? JSON.parse(existing) : [];

      let updatedFavorites;
      if (isFavorite) {
        updatedFavorites = favorites.filter((coin: any) => coin.id !== id);
      } else {
        updatedFavorites = [...favorites, { id, name, image, symbol, change, price }];
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Favori güncelleme hatası:', error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: image ?? 'https://placehold.co/40x40' }}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitleText}>
          {name}
          <Text style={styles.symbol}> ({symbol.toUpperCase()})</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={28}
          color={isFavorite ? '#7C4DFF' : 'gray'}
          style={{ paddingTop: 4 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 32,
    height: 32,
    borderRadius: 24,
    marginRight: 8,
  },
  headerTitleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  symbol: {
    color: '#7C4DFF',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default SearchStackNavigator;
