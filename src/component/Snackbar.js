import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image
} from "react-native";
import { scale, verticalScale } from "../util/scaler";

export default class Snackbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  render() {
    let AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    return (
      <TouchableOpacity
        style={[
          styles.container,
          { backgroundColor: this.props.background || "#900" }
        ]}
      >
        <View style={styles.card}>
          <Image source={require("../assets/alert.png")} style={styles.alert} />
          <Text style={[styles.text, { color: this.props.color || "white" }]}>
            {this.props.message}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    maxWidth: scale(500),
    paddingHorizontal: scale(4),
    maxHeight: verticalScale(200),
    zIndex: 100,
    top: scale(10),
    right: scale(10),
    overflow: "hidden",
    transform: [{ translateX: scale(600) }]
  },
  text: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(12),
    width: "90%",
    fontSize: scale(18)
  },
  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  alert: {
    width: scale(45),
    height: scale(45),
    alignSelf: "center"
  }
});
