import * as actionTypes from "../actions/actionTypes";

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      const user = action.payload;
      return user;
    default:
      return state;
  }
};
