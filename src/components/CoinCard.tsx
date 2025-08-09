import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';

interface CoinCardProps {
  id: string
  name: string;
  price: number;
  image: string;
  change: string;
  symbol: string;
}

const CoinCard = ({ id, name, price=0, image, change, symbol } : CoinCardProps) => {

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const getChangeColor = () => {
  const numericChange = parseFloat(change);

  if (numericChange > 0) return '#4CAF50';
  if (numericChange < 0) return '#F44336';
  return '#A3A3A3';
};

const getFormattedChange = () => {
  const numericChange = parseFloat(change);

  if (numericChange > 0) return `+${numericChange.toFixed(2)}%`;
  if (numericChange < 0) return `${numericChange.toFixed(2)}%`;
  return '0.00%';
};

  const handlePress = () =>{
    navigation.navigate("CoinDetails", {id ,name,image,symbol,price,change});
  }



  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.coinImage} />
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <View style={styles.nameSymbol}>
            <Text style={styles.coinName}>{name}</Text>
            <Text style={styles.coinSymbol}>{symbol.toUpperCase()}</Text>
          </View>
          <View style={styles.priceChange}>
            <Text style={styles.coinPrice}>₺{price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</Text>
            <Text style={[styles.coinChange, { color: getChangeColor()}]}>{getFormattedChange()}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

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
     maxWidth: 160,
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

export default CoinCard;
