import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CoinCard from '../components/CoinCard';

interface FavoriteCoin {
  id: string;
  name: string;
  image: string;
  symbol: string;
  change: string;
  price: number;
}

const FavoriteScreen = () => {
  const [favorites, setFavorites] = useState<FavoriteCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await AsyncStorage.getItem('favorites');
      if (data) {
        setFavorites(JSON.parse(data));
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('Favoriler alınırken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#7C4DFF" />
        </View>
      </SafeAreaView>
    );
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.container}>
          <Text style={styles.emptyText}>Henüz favori coin eklemediniz!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CoinCard
            id={item.id}
            name={item.name}
            image={item.image}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
          />
        )}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A1A1D",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});

export default FavoriteScreen;
