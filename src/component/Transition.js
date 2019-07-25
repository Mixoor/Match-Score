import React, { Component } from "react";
import { View, StyleSheet, Animated, Easing, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

export default class Transition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: new Animated.Value(-width),
      y: new Animated.Value(width)
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.logged !== this.props.logged) {
      this.animate();
    }
  }
  animate() {
    if (this.props.logged) {
      this.state.x.setValue(-width);

      Animated.timing(this.state.y, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      }).start();
    } else {
      this.state.y.setValue(width);

      Animated.timing(this.state.x, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true
      }).start();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.logged === nextProps.logged) return false;

    return true;
  }

  render() {
    return (
      <View style={{ ...styles.container }}>
        {!this.props.logged ? (
          <Animated.View
            style={{
              transform: [{ translateX: this.state.x }],
              width: "100%",
              height: "100%"
            }}
          >
            {this.props.children[0]}
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              transform: [{ translateX: this.state.y }],
              width: "100%",
              height: "100%"
            }}
          >
            {this.props.children[1]}
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#333"
  }
});
