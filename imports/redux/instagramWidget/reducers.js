import { Map } from 'immutable';
import actions from './actions';

const initState = new Map({
  userData: null,
  loading: true,
});

export default function reducer(state = initState, action) {
  switch (action.type) {
    case actions.GET_USER_DATA:
      return state;
    case actions.SET_USER_DATA:
      return state
        .set('loading', false)
        .set('userData', action.userData);
    default:
      return state;
  }
}