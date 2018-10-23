/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:52:59 
 * @About: 接口详情页面 
 */
import React, { Component } from 'react';
import { Row, Col, Table } from 'antd';
import http from '../utils/http';
import { Spin } from 'antd';
import { message } from 'antd';

const columns = [
  {
    title: '参数名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '参数类型',
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '是否必须',
    dataIndex: 'require',
    key: 'require',
  }, {
    title: '是否参与签名',
    dataIndex: 'sign',
    key: 'sign',
  }, {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
  }
];

export default class InterfaceDetail extends Component {

  state = {
    form: {},
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
			http.post('/interface/${this.props.match.params.interfaceId}', {})
			.then(res => {
				this.setState({ loading: false })
				if(res.code === 1) {
					this.setState({
						form: res.data
					});
				} else {
					message.error(`${res.err}`);
				}
			})
		})
  }

  render() {
    const { loading, form } = this.state;
    return(
      <div className="interface-config">
        <h2 className="page_title">查看接口
          <a onClick={() => this.props.history.goBack()}>返回</a>
        </h2>
        <Spin spinning={loading}>
        <div className="page_cont">
          <Row>
            <Col span={3}>接口中文名称：</Col>
            <Col span={9}>{form.name}</Col>
            <Col span={3}>接口英文名称：</Col>
            <Col span={9}>{form.esname}</Col>
          </Row>
          <Row>
            <Col span={3}>供应商名称：</Col>
            <Col span={9}>{form.supply}</Col>
            <Col span={3}>类型：</Col>
            <Col span={9}>{form.type}</Col>
          </Row>
          <Row>
            <Col span={3}>状态：</Col>
            <Col span={9}>{form.status}</Col>
            <Col span={3}>计费方式：</Col>
            <Col span={9}>{form.incharge}</Col>
          </Row>
          <Row>
            <Col span={3}>URL：</Col>
            <Col span={9}>{form.url}</Col>
            <Col span={3}>映射URL：</Col>
            <Col span={9}>{form.mapUrl}</Col>
          </Row>
          <Row>
            <Col span={3}>请求方式：</Col>
            <Col span={9}>{form.method}</Col>
            <Col span={3}>请求格式：</Col>
            <Col span={9}>{form.format}</Col>
          </Row>
          <Row>
            <Col span={3}>加密方式：</Col>
            <Col span={9}>{form.crypto}</Col>
          </Row>

          <Table dataSource={form.list} columns={columns} bordered pagination={false}/>
        </div>

        </Spin>
      </div>
    )
  }
}
