import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import axios from '../../../../services/axios';
import history from '../../../../services/history';
import { getLocalStorage } from '../../../../services/localStorage';

import * as actions from './actions';
import * as types from '../types';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('You made login with success!');

    axios.defaults.headers.authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (error) {
    toast.error('User or password invalids!');

    yield put(actions.loginFail());
  }
}

function persistRehydrate({ payload }) {
  // const token = get(payload, 'auth.token', '');
  const { token } = JSON.parse(getLocalStorage('login'));
  if (!token) {
    return;
  }

  axios.defaults.headers.authorization = `Bearer ${token}`;
}

// eslint-disable-next-line
function* registerRequest({ payload }) {
  const { id, name, email, password } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users/', {
        email,
        name,
        password: password || undefined,
      });
      yield put(actions.registerUpdatedSuccess(payload));
      toast.success('Account updated with success!');
    } else {
      yield call(axios.post, '/users/', {
        email,
        name,
        password,
      });
      yield put(actions.registerCreatedSuccess(payload));
      toast.success('Account created with success!');
      history.push('/login');
    }
  } catch (error) {
    const errors = get(error, 'response.data.errors', []);
    const status = get(error, 'response.status', 0);

    if (status === 401) {
      toast.info('You must do login again!');
      yield put(actions.loginFail());
      return history.push('/login');
    }

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Unknow error!');
    }

    yield put(actions.registerFail());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
