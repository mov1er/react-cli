/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:50:33 
 * @About: 项目入口 
 */
import React from 'react';
import store from './store/index';
import ReactDOM from 'react-dom';
import Login from './views/login';
import './assets/styles/index.less';
import './assets/styles/reset.less';
import history from './utils/history';
import { Provider } from 'react-redux';
import AuthorizedRoute from './authorizedRoute';
import PrimaryLayout from './layouts/primaryLayout';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch, Redirect } from 'react-router';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Switch>
        <Route path="/login" component={Login} />
        <AuthorizedRoute path="/" component={PrimaryLayout} />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
