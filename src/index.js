/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:50:33 
 * @About: 项目入口 
 */
import React from 'react';
import store from './store/index';
import ReactDOM from 'react-dom';
import Login from './views/Login';
import './assets/styles/index.less';
import './assets/styles/reset.less';
import history from './utils/history';
import { Provider } from 'react-redux';
import AuthorizedRoute from './components/Authorized';
import PrimaryLayout from './layouts/primaryLayout';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Switch } from 'react-router';
console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Switch>
        <Route path="/login" component={Login} />
        <AuthorizedRoute 
          path="/" 
          component={PrimaryLayout}
          // render={props => <PrimaryLayout {...props} />}
          redirectPath="/login"
        />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
