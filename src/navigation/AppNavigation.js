import React from 'react'
import { Platform } from 'react-native'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { MainScreen } from '../screens/MainScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { PostScreen } from '../screens/PostScreen'
import { THEME } from '../theme'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

const Stack = createStackNavigator()

export const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName='Main'
      screenOptions={{
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        headerMode: 'float',
        headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR,
        headerStyle: {
          height: 80,
          backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff',
        },
      }}
    >
      <Stack.Screen
        name='Main'
        component={MainScreen}
        options={{
          title: 'Мой блог',
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item title='Take photo' iconName='ios-camera' onPress={() => console.log('take photo')} />
            </HeaderButtons>
          ),
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item title='Menu' iconName='ios-menu' onPress={() => console.log('menu')} />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen name='Booked' component={BookedScreen} options={{ title: 'Мой блог' }} />
      <Stack.Screen name='Create' component={CreateScreen} options={{ title: 'Мой блог' }} />
      <Stack.Screen name='About' component={AboutScreen} options={{ title: 'Мой блог' }} />
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={({ route }) => ({
          title: `Пост от ${new Date(route.params.date).toLocaleDateString()}`,
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
              <Item
                title='Fav'
                iconName={route.params.booked ? 'star' : 'star-outline'}
                onPress={() => console.log('fav')}
              />
            </HeaderButtons>
          ),
        })}
      />
    </Stack.Navigator>
  )
}
