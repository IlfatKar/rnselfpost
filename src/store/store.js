import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { postReducer } from './reducers/post'

export const store = createStore(
  combineReducers({
    post: postReducer,
  }),
  applyMiddleware(thunk)
)
