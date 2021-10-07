import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostList } from '../components/PostList'
import { loadPosts } from '../store/actions/post'

export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadPosts())
  }, [dispatch])
  const allPosts = useSelector((state) => state.post.allPosts)
  return <PostList navigation={navigation} data={allPosts} />
}
