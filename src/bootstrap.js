import * as Font from 'expo-font'
export async function bootstrap() {
  await Font.loadAsync({
    'open-bold': require('../assets/fonts/OpenSans-Bold'),
    'open-regular': require('../assets/fonts/OpenSans-Regular'),
  })
}
