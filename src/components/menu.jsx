/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:55:37 
 * @About: left menu component 
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import history from '../utils/history';
import logo from '../assets/images/logo.svg';
import '../assets/styles/components/menu.less';
import { routes } from '../router';
import { addTab } from '../store/actions/tabAction';
import { connect } from 'react-redux';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MyMenu extends Component {
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
    history.push('/' + e.key);
    if(e.key === 'Dashboard') {
      return
    }
    this.props.dispatch(addTab({key:e.key, name: e.item.props.name}));
  }

  componentWillMount() {
    const url = history.location.pathname.split('/')[1];
    let supMenu = routes.find((item) => url.indexOf(item.name) > -1);
    this.setState({
      current: url,
      key: supMenu ? supMenu.name : ''
    });
  }

  componentDidMount() {
  }
  render() {
    return (
      <Sider
        width={256}
        collapsed={this.props.collapsed}
      >
        <div className="logo" key="logo">
          <img src={logo} alt="logo" />
          <h1>数据接口管理平台</h1>
        </div>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          style={{ height: '100%' }}
          mode="inline"
          ref="menu"
          defaultOpenKeys={[this.state.key]}
          selectedKeys={[this.state.current]}
          inlineCollapsed={this.props.collapsed}
        >
          {
            routes.map((item) =>
              { 
                if(item.sub === undefined || item.sub.length === 0) {
                  return (
                    <Menu.Item key={item.name} name={item.title}><Icon type={item.icon} /><span>{item.name}</span></Menu.Item>
                  )
                }
                return (
                  <SubMenu key={item.name} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                    {item.sub && item.sub.length > 0 && item.sub.map(subItem =>
                      <Menu.Item key={subItem.name} name={subItem.title}>{subItem.title}</Menu.Item>
                    )}
                  </SubMenu>
                )
              }
            )
          }
        </Menu>
      </Sider>
    )
  }
};

const stateToProps = (a) => {
  return {}
}

export default connect(stateToProps)(MyMenu);
