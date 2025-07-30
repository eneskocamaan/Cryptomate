import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

interface CoinCardProps {
  name: string;
  price: string;
  image: string;
  change: string;
  symbol: string;
}

const CoinCard: React.FC<CoinCardProps> = ({ name, price, image, change, symbol }) => {
  const getChangeColor = () => {
    if (change.startsWith('+')) return '#4ADE80';
    if (change.startsWith('-')) return '#F87171';
    return '#A3A3A3';
  };

  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.card}>
      <Image source={{ uri: image }} style={styles.coinImage} />
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <View style={styles.nameSymbol}>
            <Text style={styles.coinName}>{name}</Text>
            <Text style={styles.coinSymbol}>{symbol.toUpperCase()}</Text>
          </View>
          <View style={styles.priceChange}>
            <Text style={styles.coinPrice}>{price}</Text>
            <Text style={[styles.coinChange, { color: getChangeColor() }]}>{change}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoinCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#131313',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  coinImage: {
    width: 48,
    height: 48,
    backgroundColor: '#242424',
    borderRadius: 48,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameSymbol: {
    flexDirection: 'column',
  },
  coinName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  coinSymbol: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  priceChange: {
    alignItems: 'flex-end',
  },
  coinPrice: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  coinChange: {
    fontSize: 14,
    marginTop: 4,
  },
});
