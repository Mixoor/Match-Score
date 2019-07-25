import React, { Component } from "react";
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { scale, verticalScale } from "../util/scaler";
const { width } = Dimensions.get("screen");
export default class Login extends Component {
  state = {
    loading: false,
    focused: false
  };
  translateX = new Animated.Value(0);
  emailInput = React.createRef();
  passwordInput = React.createRef();
  shake() {
    Animated.sequence([
      Animated.timing(this.translateX, {
        toValue: 50,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(this.translateX, {
        toValue: -20,
        duration: 100,
        useNativeDriver: true
      }),
      Animated.timing(this.translateX, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  }

  render() {
    const { error } = this.props;
    let AnimatedText = Animated.createAnimatedComponent(Text);
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#222" />
        {/* <Snackbar message="Authentification erroné" /> */}
        <View style={styles.container}>
          <View style={styles.border}>
            <View
              style={{
                flex: 1,
                justifyContent: "center"
              }}
            >
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  position: "relative"
                }}
              >
                <Image source={require("../assets/logo.png")} />
              </View>
              {
                <AnimatedText
                  style={[
                    styles.label,
                    {
                      transform: [
                        {
                          translateX: this.translateX
                        }
                      ]
                    }
                  ]}
                >
                  Adresse e-mail
                </AnimatedText>
              }
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: this.translateX
                    }
                  ]
                }}
              >
                <TextInput
                  ref={this.emailInput}
                  onFocus={() => this.setState({ focused: true })}
                  style={[
                    styles.input,
                    this.props.error !== "" && !this.state.focused
                      ? styles.error
                      : null
                  ]}
                  value={this.props.value}
                  placeholderTextColor="#bbbbbb99"
                  placeholder="Exemple@exemple.com"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  ///   autoFocus={true}
                  onChangeText={text => this.props.setEmail(text)}
                />
              </Animated.View>
              <AnimatedText
                style={[
                  styles.label,
                  {
                    transform: [
                      {
                        translateX: this.translateX
                      }
                    ]
                  }
                ]}
              >
                Mot de passe
              </AnimatedText>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX: this.translateX
                    }
                  ]
                }}
              >
                <TextInput
                  ref={this.passwordInput}
                  onFocus={() => this.setState({ focused: true })}
                  style={[
                    styles.input,
                    !this.state.focused
                      ? this.props.error !== ""
                        ? styles.error
                        : null
                      : null
                  ]}
                  enablesReturnKeyAutomatically={true}
                  placeholder="********"
                  textContentType="password"
                  placeholderTextColor="#bbbbbb99"
                  secureTextEntry={true}
                  keyboardType="default"
                  value={this.props.value}
                  onChangeText={text => this.props.setPassword(text)}
                />
              </Animated.View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                {/* <TouchableOpacity style={styles.link}>
                  <Text style={styles.linkText}>
                    Oublié votre Mot de Passe ?
                  </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                  disabled={this.state.loading}
                  style={styles.btn}
                  onPress={() => {
                    this.setState({
                      loading: true
                    });
                    {
                      /**
                       * TODO
                       *  Switch with api call
                       *  */
                    }
                    setTimeout(() => this.props.check(), 500);
                  }}
                >
                  {!this.state.loading ? (
                    <Text style={styles.small}>Connexion</Text>
                  ) : (
                    <ActivityIndicator color="#333" size={34} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.error !== prevProps.error) {
      const loading = this.props.error === "";
      this.shake();
      this.setState({ loading, focused: false });
    } else if (this.props.error === prevProps.error && prevState.loading) {
      this.shake();
      this.setState({ loading: false, focused: false });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#222",
    justifyContent: "center"
  },
  border: {
    width: "50%",
    backgroundColor: "#222"
  },
  input: {
    borderBottomColor: "#444",
    borderBottomWidth: scale(4),
    paddingVertical: verticalScale(18),
    paddingHorizontal: scale(10),
    minHeight: verticalScale(50),
    backgroundColor: "#333",
    fontSize: scale(20),
    color: "white",
    marginTop: verticalScale(8),
    borderRadius: scale(4),
    marginBottom: verticalScale(12),
    width: "100%",
    letterSpacing: 1
  },
  label: {
    paddingTop: verticalScale(12),
    color: "white",
    fontSize: scale(18),
    fontWeight: "500",
    letterSpacing: 1
  },

  error: {
    borderBottomColor: "firebrick"
  },
  btn: {
    paddingHorizontal: scale(18),
    paddingVertical: verticalScale(14),
    //backgroundColor: "#9BC53D",
    backgroundColor: "rgb(205,221,104)",
    borderRadius: scale(4),
    marginTop: verticalScale(18)
  },
  link: {
    paddingVertical: verticalScale(12),
    borderRadius: scale(4),
    textAlign: "center"
  },
  small: {
    color: "white",
    fontSize: scale(20),
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 1
  },
  linkText: {
    width: "100%",
    color: "#9BC53D",
    fontSize: scale(16),
    fontWeight: "600",
    textTransform: "capitalize",
    textDecorationColor: "#777",
    textDecorationLine: "underline"
  },
  welcome: {
    textAlign: "center",
    fontSize: scale(48),
    borderRadius: 50,
    fontWeight: "900",
    color: "#9BC53D",
    textTransform: "capitalize",
    letterSpacing: scale(4),
    paddingBottom: verticalScale(18)
  },
  auth: {
    flex: 0.2,
    padding: scale(20),
    fontSize: scale(36),
    fontWeight: "600",
    color: "black",
    textTransform: "capitalize",
    letterSpacing: scale(4)
  }
});
