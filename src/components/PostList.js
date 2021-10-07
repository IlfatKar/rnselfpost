import React from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data, navigation }) => {
  return (
    <View>
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={({ id }) => id.toString()}
          renderItem={({ item }) => (
            <Post
              post={item}
              onOpen={({ date, id, booked }) => navigation.navigate('Post', { booked, date, postId: id })}
            />
          )}
        />
      ) : (
        <View style={styles.textWrap}>
          <Text style={styles.title}>Нет записей</Text>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  textWrap: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'open-bold',
    fontSize: 18,
  },
})
