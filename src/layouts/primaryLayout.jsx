/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:49:58 
 * @About: 主页路由layout 
 */
import React from 'react';
import { Route, Switch } from 'react-router';
import NotFound from '../views/Exception/404';
import AuthorizedRoute from '../components/Authorized';
import { getRouterData } from '../router/index';
import MyMenu from '../components/Menu/index';
import Header from '../components/Header/index';
import { getMenuData } from '../router/menu';

let routerArr = getRouterData();

class PrimaryLayout extends React.PureComponent {
  state = {
    menuCollapsed: false
  }
  toggleCollapsed = () => {
    this.setState({
      menuCollapsed: !this.state.menuCollapsed
    });
  }
  render() {
    return (
      <div className="wrapper">
        <div className="app">
          <MyMenu collapsed={this.state.menuCollapsed} menusData={getMenuData()}></MyMenu>
          <div className="layout">
            <Header handleClick={this.toggleCollapsed} collapsed={this.state.menuCollapsed}></Header>
            <div className="content">
              <Switch >
                {routerArr.map(item => (
                  <AuthorizedRoute
                    key={item.path}
                    path={item.path}
                    component={item.component}
                    exact={item.exact}
                    authority={item.authority}
                    redirectPath="/exception/403"
                  />
                ))}
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default PrimaryLayout;
