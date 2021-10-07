import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView, Text, StyleSheet, Image, Button, Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import { THEME } from '../theme'
import { removePost, toggleBooked } from '../store/actions/post'

export const PostScreen = ({ route, navigation }) => {
  const dispatch = useDispatch()
  const postId = route.params.postId
  const post = useSelector((state) => state.post.allPosts.find((p) => p.id === postId))
  const booked = useSelector((state) => state.post.bookedPosts.some((p) => p.id === postId))

  useEffect(() => {
    navigation.dispatch(CommonActions.setParams({ booked }))
  }, [booked])

  const toggleHandler = useCallback(() => {
    dispatch(toggleBooked(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.dispatch(CommonActions.setParams({ toggleHandler }))
  }, [toggleHandler])

  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы точно зотите удалить этот пост?',
      [
        { text: 'Нет', style: 'cancel' },
        {
          text: 'Да',
          style: 'destructive',
          onPress: () => {
            navigation.goBack()
            dispatch(removePost(postId))
          },
        },
      ],
      {
        cancelable: true,
      }
    )
  }
  if (!post) {
    return null
  }
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
