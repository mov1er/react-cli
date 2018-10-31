/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:49:58 
 * @About: 登陆后路由 
 */
import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions/loggedUserAction';

class AuthorizedRoute extends React.PureComponent {
  state = {
    isLogin: false
  }

  componentWillMount() {
    const token = sessionStorage.getItem('token');
    let isLogin = false;
    isLogin = token ? true : false;
    this.setState({
      isLogin
    });
    if(this.props.userInfo.name === undefined) {
      this.props.dispatch(setUser(JSON.parse(sessionStorage.getItem('userInfo'))));
    }
    // getLoggedUser()
  }

  render() {
    const { component: Component, pending, authority, redirectPath, userInfo, ...rest } = this.props;
    const { isLogin } = this.state;

    return (
      <Route {...rest} render={props => {
        return isLogin
          ? <Component {...props} />
          : <Redirect to={redirectPath} />
      }} />
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged,
  userInfo: loggedUserState.userInfo
})

export default connect(stateToProps)(AuthorizedRoute);
