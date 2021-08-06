import React from "react";
import HomeScreen from "./screen/HomeScreen";
import DetailScreen from "./screen/DetailScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App() {
  return (
    <AppContainer />
  );
}

const AppStackNavigation = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false,
      },
    },

    Details: {
      screen: DetailScreen,
    },
  },
  { initialRouteName: 'Home' }
);

const AppContainer = createAppContainer(AppStackNavigation)

