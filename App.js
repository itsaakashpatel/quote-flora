import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {Ionicons} from '@expo/vector-icons';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import Favourite from './src/screens/Favourite';
import Categories from './src/screens/Categories';
import CategoryScreen from './src/screens/CategoryScreen';
import SettingScreen from './src/screens/SettingScreen';

import { ThemeProvider } from './src/contexts/ThemeContext';
import { lightTheme, darkTheme } from './src/themes/themes';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function CategoriesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Categorie" component={Categories} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} headerShown={false} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ThemeProvider>
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
        <Tab.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarLabel: 'Setting',
            tabBarIcon: ({color, size}) => <Ionicons name="settings" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
      {/* <Notification></Notification> */}
    </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
