/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 18:04:09 
 * @About: 登陆用户action
 */
export const SET_LOGGED_USER = 'SET_LOGGED_USER';
export const GET_LOGGED_USER = 'GET_LOGGED_USER';

export function setUser(info) {
  return { type: SET_LOGGED_USER, info }
}

export function getUser() {
  return { type: GET_LOGGED_USER }
}
