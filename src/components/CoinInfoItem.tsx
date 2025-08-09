import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
}

const CoinInfoItem = ({ label, value }: Props) => {
  const isChange = label.toLowerCase().includes('değişim');
  const numericValue = parseFloat(value.replace('%', ''));

  const valueStyle = [
    styles.value,
    isChange && numericValue > 0 ? styles.positive : null,
    isChange && numericValue < 0 ? styles.negative : null,
  ];

  return (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      <Text style={valueStyle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#2A2A2E',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#AAA',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  positive: {
    color: '#4CAF50',
  },
  negative: {
    color: '#F44336',
  },
});

export default CoinInfoItem;
