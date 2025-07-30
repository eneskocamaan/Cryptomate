import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import CoinCard from '../components/CoinCard'


const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logocontainer}>
        <Image source={require("../assets/logo.png")} style={styles.logo}/>
      </View>
      <CoinCard
        name="Bitcoin"
        symbol="BTC"
        price="$62,000"
        change='+2.53%'
        image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png" // veya local image
      />
      <CoinCard
        name="Ethereum"
        symbol="ETH"
        price="$3,214"
        change="-5.32%"
        image="https://assets.coingecko.com/coins/images/279/large/ethereum.png"
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding:16,
        backgroundColor: "#1A1A1D"
    },
    logocontainer : {
        alignItems: "flex-start",
    },
    logo:{
      width:170,
      height:70,
      resizeMode: "none",
    }

})

export default HomeScreen