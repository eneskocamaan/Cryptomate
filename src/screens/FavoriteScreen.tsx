import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const FavoriteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>FavoriteScreen</Text>
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

export default FavoriteScreen