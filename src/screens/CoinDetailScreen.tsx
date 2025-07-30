import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const CoinDetailScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CoinDetailScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1A1A1D"
    },

})

export default CoinDetailScreen