/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:49:58 
 * @About: 主页路由layout 
 */
import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import App from '../App';
import NoMatch from '../views/404';
import Dashboard from '../views/Dashboard';
import UsageStatistics from '../views/usageStatistics';
import ParameterConfig from '../views/parameterConfig';
import InterfaceConfig from '../views/interfaceConfig';
import InterfaceAdd from '../views/interfaceAdd';
import InterfaceDetail from '../views/interfaceDetail';

const PrimaryLayout = ({ match }) => (
  <div className="wrapper">
    <App>
      <Switch >
        <Route exact path={`/`} component={Dashboard} />
        <Route path="/Dashboard" component={Dashboard} />
        <Route path={`/ParameterConfig`} component={ParameterConfig} />
        <Route path={`/InterfaceConfig`} exact component={InterfaceConfig} />
        <Route path={`/InterfaceConfig/InterfaceAdd`} exact component={InterfaceAdd} />
        <Route path={`/InterfaceConfig/Interface/:interfaceId`} component={InterfaceAdd} />
        <Route path={`/InterfaceConfig/InterfaceDetail/:interfaceId`} component={InterfaceDetail} />
        <Route path={`/UsageStatistics`} component={UsageStatistics}></Route>
        <Route component={NoMatch}/>
        {/* <Redirect to={`${match.url}`} /> */}
      </Switch>
    </App>
  </div>
)

export default PrimaryLayout;
