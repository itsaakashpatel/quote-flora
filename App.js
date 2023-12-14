import React, {useEffect} from 'react';
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
import AuthorScreen from './src/screens/AuthorScreen';

import {ThemeProvider} from './src/contexts/ThemeContext';
import {lightTheme, darkTheme} from './src/themes/themes';

import * as Font from 'expo-font';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeRootScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
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
        component={Categories}
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
  );
}

function App() {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Nutino-Regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
      });
    }

    loadFonts();
  }, []);
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({color, size}) => <Icon name="home" color={color} size={size} />,
            }}
          />
          <Stack.Screen
            name="Search"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Favourite"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Categories"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={TabNavigation}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Categorie" options={{headerShown: false}} component={Categories} />
          <Stack.Screen name="CategoryScreen" component={CategoryScreen} headerShown={false} />
          <Stack.Screen name="Author" component={AuthorScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
