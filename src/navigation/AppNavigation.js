import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { MainScreen } from '../screens/MainScreen'
import { BookedScreen } from '../screens/BookedScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { PostScreen } from '../screens/PostScreen'
import { THEME } from '../theme'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { Ionicons } from '@expo/vector-icons'

const Posts = createStackNavigator()
const Booked = createStackNavigator()
const Tab = createBottomTabNavigator()

const screenOptions = {
  headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
  headerMode: 'float',
  headerTintColor: THEME.MAIN_COLOR,
  headerStyle: {
    height: 80,
    backgroundColor: '#fff',
  },
}
const postsScreens = (Screen, allPostsScreen) => (
  <>
    <Screen
      name='Main'
      component={allPostsScreen}
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
    <Screen
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
  </>
)

const createNavigation = (Navigator, name, allPostsScreen) => {
  return (
    <Navigator initialRouteName={name} screenOptions={screenOptions}>
      {postsScreens(Posts.Screen, allPostsScreen)}
    </Navigator>
  )
}

const PostsNavigation = () => createNavigation(Posts.Navigator, 'Main', MainScreen)

const BookedNavigation = () => createNavigation(Booked.Navigator, 'Booked', BookedScreen)

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: THEME.MAIN_COLOR,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='TabPosts'
        component={PostsNavigation}
        options={{
          tabBarLabel: 'Все',
          tabBarIcon: (info) => <Ionicons name='albums-outline' size={24} color={info.color} />,
        }}
      />
      <Tab.Screen
        name='TabBooked'
        component={BookedNavigation}
        options={{
          tabBarLabel: 'Избранное',
          tabBarIcon: (info) => <Ionicons name='star-outline' size={24} color={info.color} />,
        }}
      />
    </Tab.Navigator>
  )
}
