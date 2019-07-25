import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Light from "./screens/Light";
import ScoreBoard from "./component/ScoreBoard";

const screens = createStackNavigator(
  {
    ScoreBoard: {
      screen: ScoreBoard,
      navigationOptions: {
        header: null
      }
    },
    Light: {
      screen: Light,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Light"
  }
);

export default createAppContainer(screens);
