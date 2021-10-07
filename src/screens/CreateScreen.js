import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Text, StyleSheet, TextInput, Image, Button, ScrollView, View } from 'react-native'
import { THEME } from '../theme'
import { createPost } from '../store/actions/post'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const [img, setImg] = useState(null)

  const saveHandler = () => {
    dispatch(
      createPost({
        text,
        img: img,
        date: new Date().toJSON(),
        booked: false,
      })
    )
    navigation.navigate('Main')
    setText('')
    setImg(null)
  }
  return (
    <ScrollView style={styles.wrap}>
      <Text style={styles.title}>Создать новый пост</Text>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        multiline={true}
        placeholder='Введите текст поста'
      />
      {img && (
        <Image
          style={styles.image}
          source={{
            uri: img,
          }}
        />
      )}
      <PhotoPicker
        onPick={(uri) => {
          setImg(uri)
        }}
      />
      <View style={styles.btn}>
        <Button
          title='Создать пост'
          color={THEME.MAIN_COLOR}
          onPress={saveHandler}
          disabled={!text || !img}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10,
  },
  input: {
    padding: 10,
    marginBottom: 10,
  },
  btn: {
    marginBottom: 40,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
})
