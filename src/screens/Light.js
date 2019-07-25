import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ScoreBoard from "../component/ScoreBoard";
import Login from "../component/Login";
import Transition from "../component/Transition";
import System from "../component/System";

const email = "test";
const password = "test";

export default class Light extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      email: "",
      password: "",
      logged: false,
      error: ""
    };
    this.getState();
  }

  async getState() {
    await AsyncStorage.getItem("@MS_state").then(data => {
      let s = JSON.parse(data);
      if (s !== null) {
        this.setState({
          ...s,
          loading: false
        });
      } else {
        this.setState({ loading: false });
      }
    });
  }
  logout() {
    this.setState(
      {
        email: "",
        password: "",
        logged: false,
        error: ""
      },
      () => AsyncStorage.removeItem("@MS_state")
    );
  }

  saveAsync() {
    AsyncStorage.setItem("@MS_state", JSON.stringify(this.state));
  }

  setEmail(text) {
    this.setState({ email: text });
  }
  setPassword(text) {
    this.setState({ password: text });
  }

  check() {
    if (this.state.email === email && this.state.password === password) {
      this.setState({ logged: true, error: "" }, () => this.saveAsync());
    } else {
      this.setState({ logged: false, error: "Authenfication erroné" });
    }
  }
  render() {
    const { logged, error, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size={64} color="#9BC53D" />
          </View>
        ) : (
          <Transition logged={logged}>
            <Login
              {...this.props}
              error={error}
              setEmail={text => this.setEmail(text)}
              setPassword={text => this.setPassword(text)}
              email={this.state.email}
              password={this.state.password}
              check={() => this.check()}
            />
            <System {...this.props} logout={() => this.logout()} />
          </Transition>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333"
  }
});
