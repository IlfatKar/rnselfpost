import React from 'react'
import { PostList } from '../components/PostList'
import { DATA } from '../data'

export const BookedScreen = ({ navigation }) => {
  return <PostList navigation={navigation} data={DATA.filter((p) => p.booked)} />
}
