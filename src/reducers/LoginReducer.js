import * as actions from "../actions/ActionType";

const INITIALSTATE = {
  email: null,
  password: null,
  logged: false,
  loading: false,
  error: ""
};

const login = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case actions.LOGIN_START:
      return { ...state, loading: true };
    case actions.LOGIN_END:
      return { ...state, loading: false };
    case actions.LOGIN_SUCCESS:
      return { ...state, ...action.data };
    case actions.LOGIN_FAILED:
      return { ...state, ...action.data };
    case actions.LOGOUT_START:
      return { ...state, loading: true };
    case actions.LOGOUT_SUCESS:
      return {
        email: null,
        password: null,
        logged: false,
        error: ""
      };
    case actions.LOGOUT_END:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default login;
