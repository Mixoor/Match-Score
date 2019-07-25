import React, { Component } from "react";
import {
  Dimensions,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import { moderateScale, verticalScale } from "../util/scaler.js";

const { width, height } = Dimensions.get("screen");

export default class Team extends Component {
  render() {
    return (
      <View style={[style.logo, { marginBottom: moderateScale(0) }]}>
        <View style={{}}>
          <View style={style.bg}>
            <View style={style.shadow} />
            <Image
              source={this.props.image}
              style={style.img}
              resizeMode="contain"
            />
          </View>

          <Text style={style.h1}>{this.props.name}</Text>
        </View>

        <View style={style.btnGrp}>
          <TouchableOpacity onPress={() => this.props.onAdd()}>
            <View style={style.btn}>
              <Text style={[style.h2, { color: "white" }]}>+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.onSub()}>
            <View style={style.btn}>
              <Text style={[style.h2, { color: "white" }]}>-</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
Team.defaultProps = {
  image: require("../assets/nonname.png"),
  name: "Team Name",
  onAdd: () => {},
  onSub: () => {}
};

const style = StyleSheet.create({
  logo: {
    paddingTop: moderateScale(14),
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  btnGrp: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  btn: {
    borderRadius: 8,
    //backgroundColor: "rgba(205,221,104,1)",
    //backgroundColor: "#9BC53D",
    backgroundColor: "#111",
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(8),
    marginHorizontal: moderateScale(12),
    height: moderateScale(72),
    width: moderateScale(72),
    marginTop: moderateScale(14)
  },
  h1: {
    padding: moderateScale(4),
    fontSize: moderateScale(48),
    fontWeight: "900",
    textAlign: "center",
    color: "white"
  },
  h2: {
    fontSize: moderateScale(36),
    fontWeight: "600",
    textAlign: "center",
    color: "white"
  },
  img: {
    width: height / 3,
    height: height / 3
  },
  bg: {
    position: "relative",
    padding: moderateScale(4),
    borderRadius: width,
    backgroundColor: "#222"
  },
  shadow: {
    position: "absolute",
    bottom: -verticalScale(130),
    backgroundColor: "rgba(255,255,255,0.8)",
    //backgroundColor: "#9BC53D20",
    width: "100%",
    height: "100%",
    borderRadius: width,
    transform: [{ rotateX: "82deg" }]
  }
});
