import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  Image
} from "react-native";
import { scale, verticalScale } from "../util/scaler";

const { width, height } = Dimensions.get("screen");
export default class System extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      opacity: new Animated.Value(0)
    };
  }

  toggleHidden(hidden) {
    this.setState({ hidden });
  }
  loadLight() {
    const { navigation } = this.props;
    this.toggleHidden(true);
    navigation.navigate("ScoreBoard");
    //this.setState({ Comp: ScoreBoard });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.hidden !== this.state.hidden) {
      if (this.state.hidden) {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 300
        }).start();
      } else {
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 300
        }).start();
      }
    }
  }

  renderHome() {
    let borderRadius = this.state.opacity.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [height, height, 0]
    });
    let offset = this.state.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    });
    return (
      <View style={[styles.container, { position: "relative" }]}>
        <StatusBar backgroundColor="#222" />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: scale(40),
            right: scale(40),
            borderRadius: scale(75),
            backgroundColor: "#333",
            paddingVertical: scale(14),
            paddingHorizontal: scale(14)
          }}
          onPress={() => this.props.logout()}
        >
          <Image
            source={require("../assets/logout.png")}
            style={{
              width: scale(45),
              height: scale(45)
            }}
          />
        </TouchableOpacity>
        <View style={[styles.card, { backgroundColor: "white" }]}>
          <Text
            style={{
              paddingVertical: scale(25),
              paddingHorizontal: scale(8),
              fontSize: scale(21),
              color: "#111",
              textAlign: "center",
              lineHeight: scale(28)
            }}
          >
            Match Score est disponible en deux versions légere et temps réel
          </Text>
          <TouchableOpacity
            onPress={() => this.toggleHidden(false)}
            style={{
              paddingHorizontal: scale(24),
              paddingVertical: scale(12),
              // backgroundColor: "#9bc53d",
              //backgroundColor: "rgb(205,221,104)",
              backgroundColor: "#a3c500",

              borderRadius: scale(100)
            }}
          >
            <Text style={[styles.h1]}>Choisissez votre système</Text>
          </TouchableOpacity>
        </View>

        {
          <Animated.View
            style={{
              opacity: this.state.opacity,

              ...StyleSheet.absoluteFillObject,
              top: this.state.hidden ? height : 0,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              backgroundColor: "#111111f5"
            }}
          >
            <Animated.View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                width: offset,
                borderRadius
              }}
            >
              <TouchableOpacity
                onPress={() => this.loadLight()}
                style={{
                  paddingHorizontal: scale(24),
                  paddingVertical: scale(12),
                  borderRadius: scale(100),
                  width: scale(280),
                  alignItems: "center"

                  // height: scale(60)
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e9e5dd",
                    borderRadius: scale(80),
                    width: scale(100),
                    height: verticalScale(100),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: scale(90),
                      height: verticalScale(90),
                      marginBottom: verticalScale(14)
                    }}
                    source={require("../assets/quick.png")}
                  />
                </View>
                <Text
                  style={{
                    ...styles.h1,
                    textAlign: "center"
                  }}
                >
                  Version légère
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.toggleHidden(true)}
                style={{
                  paddingHorizontal: scale(24),
                  paddingVertical: scale(12),
                  borderRadius: scale(100),
                  width: scale(280),
                  alignItems: "center"

                  // height: scale(60)
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e9e5dd",
                    borderRadius: scale(80),
                    width: scale(80),
                    height: verticalScale(80),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: scale(60),
                      height: scale(60)
                    }}
                    source={require("../assets/delete.png")}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  paddingHorizontal: scale(24),
                  paddingVertical: scale(12),
                  borderRadius: scale(100),
                  width: scale(280),
                  alignItems: "center"

                  // height: scale(60)
                }}
              >
                <View
                  style={{
                    backgroundColor: "#e9e5dd",
                    borderRadius: scale(80),
                    width: scale(100),
                    height: verticalScale(100),
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{
                      width: scale(80),
                      height: verticalScale(80)
                    }}
                    source={require("../assets/time.png")}
                  />
                </View>

                <Text
                  style={{
                    ...styles.h1,
                    textAlign: "center"
                  }}
                >
                  Version temps réel
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        }
      </View>
    );
  }

  render() {
    return <>{this.renderHome()}</>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#222"
  },
  card: {
    maxWidth: width / 2,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: scale(24)
  },
  h1: {
    color: "white",
    fontSize: scale(20),
    fontWeight: "500"
  }
});
