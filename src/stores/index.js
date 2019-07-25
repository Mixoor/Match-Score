import { combineReducers } from "redux";
import LoginReducer from "../reducers/LoginReducer";
import ScoreReducer from "../reducers/ScoreReducer";

const store = combineReducers({
  login: LoginReducer,
  score: ScoreReducer
});

export default store;
