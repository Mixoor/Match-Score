import * as actions from "./ActionType";
import AsyncStorage from "@react-native-community/async-storage";

const login_password = "test";
const login_email = "test";

// TODO Add api
export const login = (email, password) => {
  return dispatch => {
    dispatch({ type: actions.LOGIN_START });
    if (password === login_password && login_email === email) {
      AsyncStorage.setItem(
        "@MS_state",
        JSON.stringify({ password, email, logged: true })
      );
      dispatch({
        type: actions.LOGIN_SUCCESS,
        data: { password, email, logged: true }
      });
    } else
      dispatch({
        type: actions.LOGIN_FAILED,
        data: { password, email, error: "Authentification erroné" }
      });

    dispatch({ type: actions.LOGIN_END });
  };
};

export const checkStorage = () => {
  return async dispatch => {
    dispatch({ type: actions.LOGIN_START });
    await AsyncStorage.getItem("@MS_state").then(data => {
      let s = JSON.parse(data);
      if (s !== null) {
        dispatch({
          type: actions.LOGIN_SUCCESS,
          data: { ...s, loading: false }
        });
      }
    });

    dispatch({ type: actions.LOGIN_END });
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({ type: actions.LOGOUT_START });
    await AsyncStorage.removeItem("@MS_state").then(() => {
      dispatch({
        type: actions.LOGOUT_SUCESS,
        data: {
          email: null,
          password: null,
          logged: false,
          error: ""
        }
      });
    });

    dispatch({ type: actions.LOGOUT_END });
  };
};
