/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 18:04:09 
 * @About: 登陆用户action
 */

import { createAction } from 'redux-actions';
import { message } from "antd";
import http from '../../utils/http';
import history from '../../utils/history'

export const setUser = createAction('set user');

export function login(params) {
  return (dispatch) => {
    http.post('/login', params)
    .then(res => {
      // this.setState({ loading: false });
      if (res.code !== 1) {
        // message.error(`${res.err}`)
      } else {
        dispatch(setUser(res.userInfo));
        // this.props.dispatch(setUser(res.userInfo));
        sessionStorage.setItem('token', '123');
        sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo));
        message.success('登陆成功，即将跳转', () => {
          history.replace('/');
        });
      }
    })
  }
}
