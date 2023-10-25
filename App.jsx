import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "./src/screens/SplashScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import Favourite from "./src/screens/Favourite";
import Icon from "react-native-vector-icons/FontAwesome";
import Categories from "./src/screens/Categories";
import Notification from "./src/utilities/Notification";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <>
      <Notification />

      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <Icon name="home" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{
              headerShown: false,
              tabBarLabel: "Search",
              tabBarIcon: ({ color, size }) => (
                <Icon name="search" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Favourite"
            component={Favourite}
            options={{
              headerShown: false,
              tabBarLabel: "Favourite",
              tabBarIcon: ({ color, size }) => (
                <Icon name="star" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Categories"
            component={Categories}
            options={{
              headerShown: false,
              tabBarLabel: "Categories",
              tabBarIcon: ({ color, size }) => (
                <Icon name="star" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
