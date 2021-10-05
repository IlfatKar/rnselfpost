import React from 'react'
import { View, ScrollView, Text, StyleSheet, Image, Button, Alert } from 'react-native'
import { DATA } from '../data'
import { THEME } from '../theme'

export const PostScreen = ({ route }) => {
  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы точно зотите удалить этот пост?',
      [
        { text: 'Нет', style: 'cancel' },
        { text: 'Да', style: 'destructive', onPress: () => {} },
      ],
      {
        cancelable: true,
      }
    )
  }

  const post = DATA.find((p) => p.id === route.params.postId)
  return (
    <ScrollView style={styles.center}>
      <Image style={styles.img} source={{ uri: post.img }} />
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title='Удалить' color={THEME.DANGER_COLOR} onPress={removeHandler} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10,
  },
  title: {
    fontFamily: 'open-regular',
  },
})
