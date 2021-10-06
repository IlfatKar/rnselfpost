import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'
import { NavigationContainer } from '@react-navigation/native'
import { DrawerNavigation } from './src/navigation/AppNavigation'

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
    <NavigationContainer>
      <StatusBar style='auto' />
      <DrawerNavigation />
    </NavigationContainer>
  )
}
