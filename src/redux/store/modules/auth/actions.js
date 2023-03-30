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

export const registerCreatedSuccess = (payload) => {
  return { type: types.REGISTER_CREATED_SUCCESS, payload };
};

export const registerUpdatedSuccess = (payload) => {
  return { type: types.REGISTER_UPDATED_SUCCESS, payload };
};

export const registerFail = (payload) => {
  return { type: types.REGISTER_FAIL, payload };
};
