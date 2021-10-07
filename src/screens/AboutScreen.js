import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>Это приложение для личных заметок</Text>
      <Text>
        Версия приложения <Text style={styles.bold}>1.0.0</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontFamily: 'open-bold',
  },
})
