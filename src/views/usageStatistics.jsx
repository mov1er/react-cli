/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:53:48 
 * @About: 使用统计页面 
 */
import React, { Component } from 'react';
import { Button, Select, Row, Col, Radio, DatePicker, Table } from 'antd';
import '../assets/styles/views/usageStatistics.less';
import http from '../utils/http';
import { message } from 'antd';
import { Spin } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

const columns = [
	{
		title: '接口名',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '供应商',
		dataIndex: 'comp',
		key: 'comp',
	}, {
		title: '查询次数',
		dataIndex: 'checktimes',
		key: 'checktimes',
	}, {
		title: '成功次数',
		dataIndex: 'successtimes',
		key: 'successtimes',
	}, {
		title: '查得次数',
		dataIndex: 'gottimes',
		key: 'gottimes',
	}, {
		title: '失败次数',
		dataIndex: 'failtimes',
		key: 'failtimes',
	}, {
		title: '成功率',
		dataIndex: 'successrate',
		key: 'successrate',
	}, {
		title: '查得率',
		dataIndex: 'gotrate',
		key: 'gotrate',
	}, {
		title: '平均响应时间',
		dataIndex: 'restime',
		key: 'restime',
	}
];

export default class UsageStatistics extends Component {
	state = {
		value: 1,
		disabled: true,
		form: {},
		date: [],
		list: [],
		loading: false
	}
	componentDidMount() {
		this.getUsageList();
	}

	getUsageList = () => {
		this.setState({ loading: true }, () => {
			http.post('/usage', {})
			.then(res => {
				this.setState({ loading: false })
				if(res.code === 1) {
					this.setState({
						list: res.list
					});
				} else {
					message.error(`${res.err}`);
				}
			})
		})
	}

	onRadioChange = (e) => {
		console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
		if (e.target.value === 4) {
			this.setState({
				disabled: false
			});
		} else {
			this.setState({
				disabled: true
			});
		}
	}

	onChange1 = (date, dateString) => {
		console.log(date, dateString);
		this.setState({
			date: dateString
		})
	}

	onSelectChange = (val, e) => {
		if (e === 1) {
			this.setState((prevState, props) => ({
				form: Object.assign({}, prevState.form, { serv: val })
			}))
		} else if (e === 2) {
			this.setState((prevState, props) => ({
				form: Object.assign({}, prevState.form, { comp: val })
			}))
		} else if (e === 3) {
			this.setState((prevState, props) => ({
				form: Object.assign({}, prevState.form, { name: val })
			}))
		}
	}

	onSubmit = () => {
		this.setState((prevState, props) => ({
			form: Object.assign({}, prevState.form, { checkVal: prevState.value })
		}))
		if (this.state.value === 4) {
			this.setState((prevState, props) => ({
				form: Object.assign({}, prevState.form, { date: prevState.date })
			}))
		} else {

		}
		this.getUsageList();
	}

	render() {
		const { list, loading } = this.state;
		return (
			<div className="usage-statistics">
				<h2 className="page_title">使用统计</h2>
				<div className="page_cont">
					<Row>
						<Col span={8}>
							业务方：
						<Select defaultValue="all" style={{ width: '60%' }} onChange={(e) => this.onSelectChange(e, 1)}>
								<Option value="all">全部</Option>
								<Option value="1">贷上钱</Option>
								<Option value="2">快分期</Option>
							</Select>
						</Col>
						<Col span={8}>
							供应商：
						<Select defaultValue="all" style={{ width: '60%' }} onChange={(e) => this.onSelectChange(e, 2)}>
								<Option value="all">全部</Option>
								<Option value="1">聚信立</Option>
								<Option value="2">白骑士</Option>
							</Select>
						</Col>
						<Col span={8}>
							接口名：
						<Select defaultValue="all" style={{ width: '60%' }} onChange={(e) => this.onSelectChange(e, 3)}>
								<Option value="all">全部</Option>
								<Option value="1">聚信立运营商报告</Option>
								<Option value="2">白骑士运营商报告</Option>
							</Select>
						</Col>
					</Row>
					<Row>
						<RadioGroup onChange={this.onRadioChange} value={this.state.value}>
							<Col span={3}>
								<Radio value={1}>全部</Radio>
							</Col>
							<Col span={3}>
								<Radio value={2}>当天</Radio>
							</Col>
							<Col span={3}>
								<Radio value={3}>上月</Radio>
							</Col>
							<Col span={3}>
								<Radio value={4}>自选日期</Radio>
							</Col>
							<Col span={9} >
								<RangePicker onChange={this.onChange1} disabled={this.state.disabled} />
							</Col>
						</RadioGroup>
					</Row>

					<Row>

						<Col span={3} >
							<Button type="primary" onClick={this.onSubmit} icon="search">确认</Button>
						</Col>
						<Col span={3}>
							<Button icon="export">导出</Button>
						</Col>
					</Row>

					<Spin spinning={loading}>
						<Table dataSource={list} columns={columns} />
					</Spin>	

				</div>
			</div>
		)
	}
}