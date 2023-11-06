import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import Favourite from './src/screens/Favourite';
import Categories from './src/screens/Categories';
import CategoryScreen from './src/screens/CategoryScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} headerShown={false} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({color, size}) => <Icon name="home" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Search',
            tabBarIcon: ({color, size}) => <Icon name="search" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={Favourite}
          options={{
            headerShown: false,
            tabBarLabel: 'Favourite',
            tabBarIcon: ({color, size}) => <Icon name="star" color={color} size={size} />,
          }}
        />
        <Tab.Screen
          name="Categories"
          component={CategoriesStack}
          options={{
            headerShown: false,
            tabBarLabel: 'Categories',
            tabBarIcon: ({color, size}) => <Icon name="folder" color={color} size={size} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
