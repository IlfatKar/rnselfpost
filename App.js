import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { AppLoading } from 'expo'
import { bootstrap } from './src/bootstrap'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  if (!isReady) {
    return (
      <AppLoading
        startAsync={bootstrap}
        onFinish={() => setIsReady(true)}
        onError={(err) => console.log(err)}
      />
    )
  }
  return (
    <View>
      <StatusBar style='auto' />
      <Text>1</Text>
    </View>
  )
}
