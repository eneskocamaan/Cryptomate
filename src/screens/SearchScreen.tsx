import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CoinCard from '../components/CoinCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'SearchScreen'>;

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [coins, setCoins] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        // TRY cinsinden coinleri getiriyoruz (market_cap_desc sırasına göre, 250 adet)
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=try&order=market_cap_desc&per_page=250&page=1&sparkline=false'
        );
        const data = await res.json();
        setCoins(data);
      } catch (error) {
        console.error('Veri çekilemedi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCoins();
  }, []);

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7C4DFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Coin adı veya sembol ara..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {search.length > 0 && (
        <FlatList
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CoinCard
              id={item.id}
              name={item.name}
              price={item.current_price}
              image={item.image}
              change={item.price_change_percentage_24h?.toString() || '0'}
              symbol={item.symbol}
            />
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 50,
  },
  searchWrapper: {
    width: '90%',
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
});

export default SearchScreen;
