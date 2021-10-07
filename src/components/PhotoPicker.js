import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { StyleSheet, View, Image, Button, Alert } from 'react-native'

export const PhotoPicker = ({ onPick }) => {
  useEffect(() => {
    ;(async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          Alert.alert('Ошибка', 'Вы не дали прав на создание фото')
        }
      }
    })()
  }, [])

  const takePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.cancelled) {
      onPick(result.uri)
    }
  }
  return (
    <View style={styles.wrapper}>
      <Button title='Сделать фото' onPress={takePhoto} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
})
