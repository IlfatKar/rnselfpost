import * as Font from 'expo-font'
import { DB } from './db.js'
export async function bootstrap() {
  try {
    await Font.loadAsync({
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    })
    await DB.init()
    console.log('DB STARTED')
  } catch (error) {
    console.error(error)
  }
}
