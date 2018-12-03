/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:55:37 
 * @About: left menu component 
 */
import React, { Component } from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import logo from '../../assets/images/logo.svg';
import './menu.less';
// import { addTab } from '../../store/actions/tabAction';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class MyMenu extends Component {
  constructor(props) {
    super(props);
    this.menus = props.menusData;
    this.state = {
      openKeys: [],
      selectedKeys: []
    };
  }

  handleClick = (selectedKeys) => {
    let { keyPath } = selectedKeys;
    keyPath.reverse();
    this.setState({
      selectedKeys: keyPath
    });
  }

  componentWillMount() {
    let selectedKeys = history.location.pathname.split('/');
    let openKeys = history.location.pathname.split('/');
    selectedKeys.shift();
    openKeys.shift();
    openKeys.pop();
    this.setState({
      selectedKeys,
      openKeys
    });
  }

  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => {
        const ItemDom = this.getSubMenuOrItem(item);
        return this.checkPermissionItem(item.authority, ItemDom);
      })
      .filter(item => item);
  }

  getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = this.getNavMenuItems(item.children);
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={item.icon ? (<span><Icon type={item.icon} /><span>{item.title}</span></span>) : (item.title)}
            key={item.name}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return (
        <Menu.Item key={item.name}>
          {item.icon && <Icon type={item.icon} />}
          <Link to={item.path}>
            <span>{item.title}</span>
          </Link>
        </Menu.Item>
      );
    }
  };

  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized;
      return check(authority, ItemDom);
    }
    return ItemDom;
  };

  handleOpenChange = (openKeys) => {
    this.setState({
      openKeys
    })
  }

  render() {
    const { openKeys, selectedKeys } = this.state;
    return (
      <Sider
        width={256}
        collapsed={this.props.collapsed}
      >
        <div className="logo" key="logo">
          <img src={logo} alt="logo" />
          <h1>CRM</h1>
        </div>
        <Menu
          theme="dark"
          style={{ height: '100%' }}
          mode="inline"
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onClick={this.handleClick}
          onOpenChange={this.handleOpenChange}
          inlineCollapsed={this.props.collapsed}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    )
  }
};

export default MyMenu;
