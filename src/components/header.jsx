/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:55:16 
 * @About: header component 
 */
import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Modal } from 'antd';
import '../assets/styles/components/header.less';
import history from '../utils/history';
import { connect } from 'react-redux';

const confirm = Modal.confirm;

function showConfirm() {
  confirm({
    title: '确认退出?',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      sessionStorage.removeItem('token');
      history.push('/login');
    }
  });
}

function handleMenuClick(e) {
  if (e.key === "3") {
    showConfirm();
  }
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="0">个人中心</Menu.Item>
    <Menu.Item key="1">设置</Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">退出</Menu.Item>
  </Menu>
);

class Header extends Component {

  render() {
    const { name } = this.props.userInfo;
    return (
      <div className="header">
        <div className="header-title" onClick={this.props.handleClick} >
          <Icon type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </div>
        <div className="header-user_box">
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              欢迎你，{name} <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    )
  }
}

const stateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged,
  userInfo: loggedUserState.userInfo
})

export default connect(stateToProps)(Header);
