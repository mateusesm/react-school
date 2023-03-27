import * as types from '../types';

export const loginRequest = (payload) => {
  return { type: types.LOGIN_REQUEST, payload };
};

export const loginSuccess = (payload) => {
  return { type: types.LOGIN_SUCCESS, payload };
};

export const loginFail = (payload) => {
  return { type: types.LOGIN_FAIL, payload };
};

export const registerRequest = (payload) => {
  return { type: types.REGISTER_REQUEST, payload };
};

export const registerSuccess = (payload) => {
  return { type: types.REGISTER_SUCCESS, payload };
};

export const registerFail = (payload) => {
  return { type: types.REGISTER_FAIL, payload };
};
