/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:54:09 
 * @About: 登陆用户reducer
 */
const initialState = {
  pending: true,
  logged: false,
  userInfo: {}
}

const loggedUserReducer = (state = initialState, action) => {
  if(action.type === 'GET_LOGGED_USER') {
    return Object.assign({}, state, {
      pending: false
    })
  }
  if(action.type === 'SET_LOGGED_USER') {
    return Object.assign({}, state, {
      pending: false,
      logged: true,
      userInfo: action.info
    })
  }
  return state
}

export default loggedUserReducer
