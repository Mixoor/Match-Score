import * as actions from "../actions/ActionType";

const INITIALSTATE = {
  teamName: ["Equipe A", "Equipe B"],
  score: [0, 0],
  error: null
};

export default (state = INITIALSTATE, action) => {
  switch (action.type) {
    case actions.SET_SCORE_TEAM:
      return { ...state, ...action.data };
    case actions.RESET_SCORE:
      return { ...INITIALSTATE };
    case actions.RESET_FAILED:
      return { ...state, ...action.data };

    default:
      return state;
  }
};
