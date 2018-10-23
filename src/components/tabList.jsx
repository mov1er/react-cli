import React, { Component } from 'react';
import { Tabs } from 'antd';
import history from '../utils/history';
import { connect } from 'react-redux';
import { delTab, clickTab } from '../store/actions/tabAction';

const TabPane = Tabs.TabPane;

class TabList extends Component {

  onChange = (activeKey) => {
    this.props.dispatch(clickTab({activeKey}));
    this.setState({ activeKey });
    history.push( '/' + activeKey);
  }
  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  remove = (targetKey) => {
    this.props.dispatch(delTab({targetKey}));
  }
	render() {
    const { tabState } = this.props;
		return (
			<Tabs
        onChange={this.onChange}
        activeKey={tabState.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {tabState.list.map(pane => <TabPane tab={pane.name} key={pane.key} closable={pane.closable}></TabPane>)}
      </Tabs>
		)
	}
}

const stateToProps = ({tabState}) => ({tabState})

export default connect(stateToProps)(TabList);
