import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data, navigation }) => {
  return (
    <View style={styles.wrapper}>
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
    </View>
  )
}
const styles = StyleSheet.create({
  center: {
    flex: 1,
    padding: 10,
  },
})
