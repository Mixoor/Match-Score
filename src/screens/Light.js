import React, { PureComponent } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Login from "../component/Login";
import Transition from "../component/Transition";
import System from "../component/System";

import { checkStorage, login, logout } from "../actions/LoginAction";
import { connect } from "react-redux";

class Light extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      email: "",
      password: ""
    };
  }

  setEmail(text) {
    this.setState({ email: text });
  }
  setPassword(text) {
    this.setState({ password: text });
  }

  async check() {
    const { password, email } = this.state;
    await this.props.login(email, password);
    if (this.props.logged === true) {
      this.setState({ password: "", email: "" });
    }
  }

  componentDidMount() {
    this.props.checkStorage();
  }

  render() {
    const { logged, error, loading } = this.props;
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
            <System {...this.props} logout={() => this.props.logout()} />
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

const mapStateToProps = state => {
  return { ...state.login };
};

const mapDispatchToProps = dispatch => {
  return {
    checkStorage: () => dispatch(checkStorage()),
    login: (email, password) => dispatch(login(email, password)),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Light);
