/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:50:52 
 * @About: 项目主页页面 
 */
import React, { Component } from 'react';
import Header from './components/header';
import MyMenu from './components/menu';
import TabList from './components/tabList';
import history from './utils/history';

class App extends Component {
	state = {
		menuCollapsed: false
	}
	toggleCollapsed = () => {
		this.setState({
			menuCollapsed: !this.state.menuCollapsed
		});
	}
	
	render() {
		const { children } = this.props;
		console.log(history);
		return (
			<div className="app">
				<MyMenu collapsed={this.state.menuCollapsed}></MyMenu>
				<div className="layout">
					<Header handleClick={this.toggleCollapsed} collapsed={this.state.menuCollapsed}></Header>
					{
						history.location.pathname === '/Dashboard' ? '' : <TabList></TabList>
					}
					
					<div className="content">
						{children}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
