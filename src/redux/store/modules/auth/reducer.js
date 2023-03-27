import * as types from '../types';

import {
  addLocalStorage,
  getLocalStorage,
} from '../../../../services/localStorage';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

// eslint-disable-next-line
export default (state = initialState, action) => {
  console.log('EU SOU A ACTION', action);
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      const newState = { ...state, isLoading: true };
      return { ...newState };
    }
    case types.LOGIN_SUCCESS: {
      const newState = {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        user: { ...action.payload.user },
        isLoading: false,
      };
      addLocalStorage({ ...newState, user: { ...action.payload.user } });
      return { ...newState };
    }
    case types.LOGIN_FAIL: {
      const newState = { ...initialState };
      return { ...newState };
    }
    case types.REGISTER_REQUEST: {
      const newState = { ...state, isLoading: true };
      return { ...newState };
    }
    case types.REGISTER_SUCCESS: {
      const loginStorage = JSON.parse(getLocalStorage('login'));
      const newState = {
        ...loginStorage,
        isLoggedIn: true,
        isLoading: false,
      };
      console.log('REGISTER SUCCESS');
      console.log(loginStorage);
      addLocalStorage({ ...newState, user: { ...action.payload } });
      return { ...newState };
    }
    case types.REGISTER_FAIL: {
      const newState = { ...state, isLoading: false };
      return { ...newState };
    }
    default: {
      return { ...state };
    }
  }
};