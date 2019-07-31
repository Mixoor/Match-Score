import * as actions from "./ActionType";

const reset_code = "ABCD";

export const updateScore = score => {
  return dispatch => {
    dispatch({
      type: actions.SET_SCORE_TEAM,
      data: {
        score: score
      }
    });
  };
};

// TODO ADD API FOR CHECKING CODE
export const resetScore = code => {
  return dispatch => {
    if (code === reset_code) dispatch({ type: actions.RESET_SCORE });
    else
      dispatch({
        type: actions.RESET_FAILED,
        data: {
          error: "Votre Code est incorrect"
        }
      });
  };
};
