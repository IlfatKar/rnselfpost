import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Post } from '../components/Post'
import { DATA } from '../data'

export const BookedScreen = ({ navigation }) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={DATA.filter((p) => p.booked)}
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
