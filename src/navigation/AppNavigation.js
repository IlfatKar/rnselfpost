import React from 'react'
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
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
const Drawer = createDrawerNavigator()

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
      options={({ navigation }) => ({
        title: 'Мой блог',
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Take photo' iconName='ios-camera' onPress={() => navigation.navigate('Create')} />
          </HeaderButtons>
        ),
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Menu' iconName='ios-menu' onPress={() => navigation.openDrawer()} />
          </HeaderButtons>
        ),
      })}
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

const TabNavigation = () => {
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

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Tabs'
      screenOptions={{
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: THEME.MAIN_COLOR,
        headerShown: false,
        headerMode: 'float',
        headerTintColor: THEME.MAIN_COLOR,
        headerStyle: {
          height: 80,
          backgroundColor: '#fff',
        },
        drawerLabelStyle: {
          fontFamily: 'open-bold',
        },
        drawerItemStyle: {
          marginHorizontal: 0,
          borderRadius: 0,
        },
      }}
    >
      <Drawer.Screen
        name='Tabs'
        component={TabNavigation}
        options={{
          drawerLabel: 'Посты',
        }}
      />
      <Drawer.Screen
        name='Create'
        component={CreateScreen}
        options={{ drawerLabel: 'Новый пост', headerShown: true, title: 'Новый пост' }}
      />
      <Drawer.Screen
        name='About'
        component={AboutScreen}
        options={{ drawerLabel: 'О приложении', title: 'О приложении', headerShown: true }}
      />
    </Drawer.Navigator>
  )
}
