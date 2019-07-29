import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  StatusBar
} from "react-native";
import { moderateScale, scale, verticalScale } from "../util/scaler";
import { connect } from "react-redux";
import { updateScore, resetScore } from "../actions/ScoreAction";
import Team from "./Team";

const { width, height } = Dimensions.get("screen");
class ScoreBoard extends Component {
  state = {
    time:
      this.checkTime(new Date().getHours()) +
      ":" +
      this.checkTime(new Date().getMinutes()),
    model: false,
    text: ""
  };

  progress = null;

  async onAdd(id) {
    let score = [...this.props.score];
    score[id] = ++score[id];
    await this.props.updateScore(score);
  }

  async onSub(id) {
    let score = [...this.props.score];
    if (score[id] > 0) {
      score[id] = --score[id];
      await this.props.updateScore(score);
    }
  }

  reset() {
    this.setState({
      score: [0, 0],
      teamName: ["Equipe A", "Equipe B"],
      error: null,
      model: false,
      text: ""
    });
  }

  renderModel() {
    return (
      <Modal animationType="fade" transparent={true} visible={this.state.model}>
        <KeyboardAvoidingView
          enabled={false}
          behavior="height"
          style={{
            padding: moderateScale(8),
            flex: 1,
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: width / 2,
              flex: 0.6
            }}
          >
            <Text style={[style.title, { fontFamily: "Changa" }]}>
              Confirmation
            </Text>
            <View
              style={{
                flex: 1
              }}
            >
              <ScrollView
                contentContainerStyle={{
                  padding: moderateScale(12),
                  flex: 1
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                scrollEnabled
              >
                <View
                  style={{
                    flex: 0.7,
                    paddingVertical: moderateScale(18)
                  }}
                >
                  {this.props.error !== null ? (
                    <Text style={[style.error, { fontFamily: "Changa" }]}>
                      {this.props.error}
                    </Text>
                  ) : null}
                  <Text style={style.small}>Code:</Text>
                  <TextInput
                    style={{
                      paddingVertical: moderateScale(14),
                      borderColor: "#222",
                      color: "#333",
                      borderWidth: 1,
                      borderRadius: 4,
                      fontSize: moderateScale(26)
                    }}
                    onChangeText={text => this.setState({ text })}
                    value={this.state.text}
                    placeholder="XXXXXXXXXX"
                    autoFocus={true}
                  />
                </View>

                <View
                  style={{
                    flex: 0.3,
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    paddingHorizontal: moderateScale(8)
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        model: false,
                        error: null,
                        text: ""
                      });
                    }}
                  >
                    <Text style={[style.modelText]}>Annuler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      await this.props.resetScore(this.state.text);
                      if (this.props.error === null)
                        this.setState({ model: false });
                    }}
                  >
                    <Text style={[style.modelText, { color: "#5994D9" }]}>
                      Confirmer
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    );
  }

  checkTime(time) {
    return time.toString().length < 2 ? "0" + time : time;
  }
  componentDidMount = () => {
    this.progress = setInterval(() => {
      this.setState({
        time:
          this.checkTime(new Date().getHours()) +
          ":" +
          this.checkTime(new Date().getMinutes())
      });
    }, 10000);
  };

  componentWillUnmount() {
    clearInterval(this.progress);
  }

  render() {
    const { teamName, score } = this.props;
    return (
      <KeyboardAvoidingView style={style.card} enabled={false}>
        <StatusBar backgroundColor="#222" />

        {this.renderModel()}
        <View style={style.header}>
          <Text style={[style.center, { fontFamily: "Changa" }]}>
            <Image
              source={require("../assets/clock.png")}
              style={{
                width: moderateScale(160),
                height: moderateScale(160)
              }}
            />
            {this.state.time}
          </Text>
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              alignItems: "center",
              justifyContent: "space-around",
              padding: verticalScale(25)
            }}
          >
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.props.navigation.goBack();
                //this.props.logout();
              }}
            >
              <Image
                source={require("../assets/back.png")}
                style={{
                  width: moderateScale(65),
                  height: moderateScale(65)
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                this.setState({ model: true });
              }}
            >
              <Image
                source={require("../assets/reset.png")}
                style={{
                  width: moderateScale(65),
                  height: moderateScale(65)
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={style.board}>
          <Team
            score={score[0]}
            name={teamName[0]}
            onAdd={() => {
              this.onAdd(0);
            }}
            onSub={() => {
              this.onSub(0);
            }}
          />

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={style.h1}>{score[0]}</Text>
              <Text
                style={[
                  style.h1,
                  {
                    color: "rgba(255,255,255,1)",
                    paddingHorizontal: moderateScale(8)
                  }
                ]}
              >
                -
              </Text>
              <Text style={style.h1}>{score[1]}</Text>
            </View>
          </View>

          <Team
            onAdd={() => {
              this.onAdd(1);
            }}
            onSub={() => {
              this.onSub(1);
            }}
            score={score[1]}
            name={teamName[1]}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateScore: score => dispatch(updateScore(score)),
    resetScore: code => dispatch(resetScore(code))
  };
};

const mapStateToProps = state => {
  return { ...state.score };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);

const style = StyleSheet.create({
  center: {
    flex: 1,
    fontFamily: "Changa",
    textAlign: "center",
    fontSize: scale(160),
    fontWeight: "900",
    color: "white",
    letterSpacing: 8
  },
  card: {
    flex: 1
  },
  board: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#222",
    paddingHorizontal: scale(12)
  },
  header: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#a3c500"

    //backgroundColor: "#9BC53D"
    //backgroundColor: "rgb(205,221,104)"
    //backgroundColor: "#222"
    ///backgroundColor: "#6CBD45"
  },
  h1: {
    fontSize: moderateScale(124),
    fontWeight: "900",
    textAlign: "center",
    color: "white"
  },
  small: {
    fontWeight: "200",
    fontSize: moderateScale(22),
    paddingBottom: moderateScale(8),
    color: "gray"
  },
  btn: {
    borderRadius: 8,
    //backgroundColor: "#9BC53D",
    backgroundColor: "rgba(255,0,0,0.5)",
    textAlign: "center",
    height: moderateScale(72),
    paddingVertical: verticalScale(12),
    paddingHorizontal: moderateScale(12)
  },
  h2: {
    fontSize: moderateScale(36),
    fontWeight: "600",
    textAlign: "center",
    color: "white"
  },
  title: {
    color: "#333",
    fontSize: moderateScale(28),
    borderColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 8,
    paddingVertical: 14,
    borderBottomWidth: 1,
    fontWeight: "600"
  },
  modelText: {
    fontSize: moderateScale(24),
    padding: scale(10)
  },
  error: {
    fontSize: moderateScale(22),
    color: "white",
    backgroundColor: "rgba(255,0,0,0.5)",
    marginVertical: scale(4),
    paddingHorizontal: scale(4),
    paddingVertical: scale(6)
  }
});
