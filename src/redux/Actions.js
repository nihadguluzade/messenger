import * as userActionTypes from "./constants/UserActionTypes"

export const logoutAction = () => {
  return { type: userActionTypes.LOGOUT };
};

export const signIn = (user) => {
  return { type: userActionTypes.SIGN_IN, user };
}