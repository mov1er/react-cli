/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:52:23 
 * @About:  接口配置列表页面
 */
import React, { Component } from 'react';
import { Button, Select, Row, Col, Table, Modal, message } from 'antd';
import { Spin } from 'antd';
import http from '../utils/http';
import { Link } from 'react-router-dom';

const Option = Select.Option;
const confirm = Modal.confirm;

const columns = [
	{
		title: '接口名',
		dataIndex: 'name',
		key: 'name',
	}, {
		title: '英文名',
		dataIndex: 'esname',
		key: 'esname',
	}, {
		title: '供应商',
		dataIndex: 'supply',
		key: 'supply',
	}, {
		title: '类型',
		key: 'type',
		render: (text, record) => {
			return record.type === 1 ? '异步' : '同步'
		}
	}, {
		title: '状态',
		key: 'status',
		render: (text, record) => {
			return record.status === 1 ? '有效' : '无效'
		}
	}, {
		title: '操作',
		key: 'action',
		render: (text, record) => (
			<span>
				<Link to={`/Config/InterfaceConfig/InterfaceDetail/${record.key}`}>查看</Link>
				<Link to={`/Config/InterfaceConfig/Interface/${record.key}`} style={{margin: '0 20px'}}>编辑</Link>
				<a onClick={() => showConfirm(record)}>删除</a>
			</span>
		),
	}
];

function showConfirm(record) {
	console.log(record)
  confirm({
    title: '确认删除该接口?',
    okText: '确认',
    cancelText: '取消',
    onOk() {
			console.log('yep');
			//todo http request
    }
  });
}

export default class InterfaceConfig extends Component {
	state = {
		loading: false,
		list: [],
		form: {}
	}
	componentDidMount() {
		this.getList();
	}

	getList = () => {
		this.setState({ loading: true }, () => {
			http.post('/config', {})
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

	onSelectChange = (val, e) => {
		if (e === 1) {
			this.setState((prevState, props) => ({
				form: Object.assign({}, prevState.form, { serv: val })
			}))
		} else if (e === 2) {
			this.setState((prevState, props) => ({
				form: Object.assign({}, prevState.form, { comp: val })
			}))
		}
	}

	goToAdd = () => {
		this.props.history.push('/Config/InterfaceConfig/InterfaceAdd')
	}

	onSubmit = () => {
		console.log(this.state.form);
	}

	render() {
		const { list, loading } = this.state;
		return (
			<div className="interface-config">
				<h2 className="page_title">接口配置</h2>
				<div className="page_cont">
					<Row>
						<Col span={8}>
							供应商：
						<Select defaultValue="all" style={{ width: '60%' }} onChange={(e) => this.onSelectChange(e, 1)}>
								<Option value="all">全部</Option>
								<Option value="1">聚信立</Option>
								<Option value="2">白骑士</Option>
							</Select>
						</Col>
						<Col span={8}>
							接口名：
						<Select defaultValue="all" style={{ width: '60%' }} onChange={(e) => this.onSelectChange(e, 2)}>
								<Option value="all">全部</Option>
								<Option value="1">聚信立运营商报告</Option>
								<Option value="2">白骑士运营商报告</Option>
							</Select>
						</Col>
						<Col span={8} >
							<Button type="primary" icon="search" onClick={this.onSubmit}>确认</Button>
						</Col>
					</Row>
					<Row>
						<Col span={8} >
							<Button type="primary" icon="plus" onClick={this.goToAdd}>新增接口</Button>
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