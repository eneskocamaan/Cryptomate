import { View, Text, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/HomeStackNavigator';
import { LineChart } from 'react-native-chart-kit';

import CoinInfoItem from '../components/CoinInfoItem';
import CoinProjectInfo from '../components/CoinProjectInfo';

type CoinDetailRouteProp = RouteProp<HomeStackParamList, 'CoinDetails'>;

const screenWidth = Dimensions.get('window').width;

const CoinDetailScreen = () => {
  const route = useRoute<CoinDetailRouteProp>();
  const { id } = route.params;

  const [coinData, setCoinData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: { data: number[] }[] } | null>(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        // Coin detayları
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await response.json();
        setCoinData(data);

        // Grafik verisi
        const chartResponse = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=try&days=365&interval=daily`
        );
        const chartJson = await chartResponse.json();

        const prices = chartJson.prices || [];

        // Grafikte gösterilecek etiketleri 10 adet eşit aralıkta seçiyoruz
        const labels = prices
          .filter((_: any, i: number) => i % Math.floor(prices.length / 10) === 0)
          .map((price: any) => {
            const date = new Date(price[0]);
            return `${date.getDate()}/${date.getMonth() + 1}`;
          });

        // Grafik için fiyat verileri (sayısal ve finite olanları filtrele)
        const dataPoints = prices
          .map((p: any) => p[1])
          .filter((v: any) => typeof v === 'number' && isFinite(v));

        setChartData({
          labels,
          datasets: [
            {
              data: dataPoints,
              // nokta çizgisi kaldırmak için:
              // strokeWidth vs. ile oynayabilirsin ama react-native-chart-kit otomatik nokta çiziyor
            },
          ],
        });
      } catch (error) {
        console.error('Veri Çekilmedi', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#7C4DFF" />
      </View>
    );
  }

  if (!coinData) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: '#fff' }}>Veri yüklenemedi.</Text>
      </View>
    );
  }

  const market = coinData.market_data;

  const infoList = [
    { label: 'İsim', value: coinData?.name ?? '-' },
    { label: 'Sembol', value: coinData?.symbol ? coinData.symbol.toUpperCase() : '-' },
    {
      label: 'Güncel Fiyat',
      value:
        market?.current_price?.try != null
          ? `₺${market.current_price.try.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          : '-',
    },
    {
      label: '24s Değişim',
      value:
        market?.price_change_percentage_24h != null ? `${market.price_change_percentage_24h.toFixed(2)}%` : '-',
    },
    {
      label: 'Piyasa Değeri',
      value: market?.market_cap?.try != null ? `₺${market.market_cap.try.toLocaleString('tr-TR')}` : '-',
    },
    {
      label: 'Sıralama',
      value: coinData?.market_cap_rank != null ? `#${coinData.market_cap_rank}` : '-',
    },
    {
      label: '24s Hacim',
      value: market?.total_volume?.try != null ? `₺${market.total_volume.try.toLocaleString('tr-TR')}` : '-',
    },
    {
      label: '24s En Yüksek',
      value: market?.high_24h?.try != null ? `₺${market.high_24h.try.toLocaleString('tr-TR')}` : '-',
    },
    {
      label: '24s En Düşük',
      value: market?.low_24h?.try != null ? `₺${market.low_24h.try.toLocaleString('tr-TR')}` : '-',
    },
    {
      label: 'ATH',
      value: market?.ath?.try != null ? `₺${market.ath.try.toLocaleString('tr-TR')}` : '-',
    },
    {
      label: "ATH'den Düşüş",
      value:
        market?.ath_change_percentage?.try != null ? `${market.ath_change_percentage.try.toFixed(2)}%` : '-',
    },
    {
      label: 'Dolaşımdaki Arz',
      value: market?.circulating_supply != null ? market.circulating_supply.toLocaleString('tr-TR') : '-',
    },
    {
      label: 'Son Güncelleme',
      value: coinData?.last_updated
        ? new Date(coinData.last_updated).toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })
        : '-',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {chartData && (
          <LineChart
            data={chartData}
            width={screenWidth - 20}
            height={220}
            
            chartConfig={{
              backgroundGradientFrom: '#222222',
              backgroundGradientTo: '#222222',
              
              color: (opacity = 1) => `rgba(124, 77, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '0', // nokta görünmez
              },
            }}
            bezier
            style={{
              marginVertical: 16,
              borderRadius: 16,
            }}
            withDots={false} // nokta çizimini kapatır
            withInnerLines={false} // yatay çizgileri kapatır
            withOuterLines={false} // dış çizgileri kapatır
            withShadow={false} // gölge kapalı
            onDataPointClick={() => {}} // tıklama devre dışı veya boş bırak
          />
        )}
      </View>

      <FlatList
        style={styles.list}
        data={infoList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CoinInfoItem label={item.label} value={item.value} />}
        ListFooterComponent={
          <CoinProjectInfo
            description={coinData.description?.tr || coinData.description?.en}
            homepage={coinData.links?.homepage}
            whitepaperUrl={coinData.links?.official_forum_url?.[0] || coinData.links?.whitepaper}
            hashingAlgorithm={coinData.hashing_algorithm}
            genesisDate={coinData.genesis_date}
            twitterUsername={coinData.links?.twitter_screen_name}
            subredditUrl={coinData.links?.subreddit_url}
          />
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  loader: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
  },
});

export default CoinDetailScreen;
