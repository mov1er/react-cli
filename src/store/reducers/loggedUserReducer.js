import { handleActions } from 'redux-actions';

const initialState = {
  pending: true,
  logged: false,
  userInfo: {}
}

const loggedUserReducer = handleActions({
  'set user'(state, action) {
    return Object.assign({}, state, {
      pending: false,
      logged: true,
      userInfo: action.payload
    })
  }
}, initialState);

export default loggedUserReducer;