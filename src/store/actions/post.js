import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, CREATE_POST } from '../types'
import { DB } from '../../db'
import * as FileSystem from 'expo-file-system'

export const loadPosts = () => {
  return async (dispatch) => {
    const posts = await DB.getPosts()
    dispatch({ type: LOAD_POSTS, payload: posts })
  }
}

export const toggleBooked = (post) => async (dispatch) => {
  try {
    await DB.updatePost(post)
  } catch (e) {
    console.error(e)
  }
  dispatch({
    type: TOGGLE_BOOKED,
    payload: post.id,
  })
}

export const removePost = (id) => async (dispatch) => {
  try {
    await DB.removePost(id)
  } catch (e) {
    console.error(e)
  }
  dispatch({
    type: REMOVE_POST,
    payload: id,
  })
}

export const createPost = (post) => async (dispatch) => {
  const fileName = post.img.split('/').pop()
  const newPath = FileSystem.documentDirectory + fileName

  try {
    await FileSystem.moveAsync({
      to: newPath,
      from: post.img,
    })
  } catch (e) {
    console.error(e)
  }

  const payload = {
    ...post,
    img: newPath,
  }

  const id = await DB.createPost(payload)

  payload.id = id

  dispatch({
    type: CREATE_POST,
    payload,
  })
}
