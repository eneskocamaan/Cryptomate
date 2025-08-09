import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CoinCard from '../components/CoinCard';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  change: string;
  price: number;
  image: string;
};

const HomeScreen = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=try");

      if (!response.ok) {
        throw new Error(`API hatası: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("API'den beklenmeyen veri tipi geldi");
      }

      const filtered: Coin[] = data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol ? coin.symbol.toUpperCase() : '-',
        change: (coin.price_change_percentage_24h ?? 0).toFixed(2) + '%',
        price: coin.current_price,
        image: coin.image,
      }));

      setCoins(filtered);
    } catch (error: any) {
      console.error('API Hatası:', error.message ?? error);
      Alert.alert("Hata", "Veriler alınırken bir hata oluştu. Lütfen tekrar deneyin.");
      setCoins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#7C4DFF" style={{ marginTop: 20 }} />
      ) : coins.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Gösterilecek coin bulunamadı.</Text>
        </View>
      ) : (
        <FlatList
          data={coins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CoinCard
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              symbol={item.symbol}
              change={item.change}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 8,
    backgroundColor: "#1A1A1D",
    paddingBottom:-24,
  },
  logocontainer: {
    alignItems: "flex-start",
    paddingLeft: 16,
  },
  logo: {
    width: 170,
    height: 50,
    resizeMode: "contain",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 16,
  },
});

export default HomeScreen;
