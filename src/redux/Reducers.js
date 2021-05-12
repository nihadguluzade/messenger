import * as userActionTypes from "./constants/UserActionTypes"

const initialState = {};

export const userReducer = function(state = initialState, action) {
  switch (action.type) {
    case userActionTypes.LOGOUT:
      return {...state, user: undefined};
    case userActionTypes.SIGN_IN:
      return {...state, user: action.user};
    default:
      return state;
  }
}
