import { all, takeEvery, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { clearToken, getToken } from '../../helpers/utility';
import actions from './actions';

const isPromise = obj => Boolean(obj) && typeof obj.then === 'function';

const next = (iter, callbacks, prev = undefined) => {
    const { onNext, onCompleted } = callbacks;
    const item = iter.next(prev);
    const value = item.value;

    if (item.done) {
        return onCompleted();
    }

    if (isPromise(value)) {
        value.then(val => {
            onNext(val);
            setTimeout(() => next(iter, callbacks , val),0);
        });
    } else {
        onNext(value);
        setTimeout(() => next(iter, callbacks, value),0);
    }
};

const gensync = (fn) => (...args) => ({
    subscribe: (onNext, onError, onCompleted) => {
        next(fn(...args), { onNext, onError, onCompleted });
    }
});



const fetchAccount = (user,pass) => new Promise((resolve) => {
    Meteor.loginWithPassword(user,pass, (e)=>{
        console.log("loginWithPassword")
        if (e) {
            resolve(false)
        } else {
            resolve(true)
        }})
});


export  function*  loginRequest(payload) {

    const result = yield fetchAccount(payload.payload.username,payload.payload.password); // returns promise
    if(result)
    {
        payload.token ="found"
        yield put({
            type: actions.LOGIN_SUCCESS,
            payload: payload,
            profile: 'Profile'
        });
    }else{
        yield put({ type: actions.LOGIN_ERROR });
    }

}
export function* loginSuccess({ payload }) {
    payload.token = "found"
    yield localStorage.setItem('id_token', payload.token);
}

export function* loginError() {}

export function* logout() {
  Meteor.loggingOut();
  clearToken();
  yield put(push('/'));
}

export function* settings() {
    yield put(push('/settings'));
}
export function* checkAuthorization() {
  const token = getToken().get('idToken');
  if (token) {
    yield put({
      type: actions.LOGIN_SUCCESS,
      payload: { token },
      profile: 'Profile'
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.CHECK_AUTHORIZATION, checkAuthorization),
    yield takeEvery(actions.LOGIN_REQUEST, loginRequest),
    yield takeEvery(actions.LOGIN_SUCCESS, loginSuccess),
    yield takeEvery(actions.LOGIN_ERROR, loginError),
    yield takeEvery(actions.LOGOUT, logout)
  ]);
}
