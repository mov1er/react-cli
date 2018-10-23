/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:51:46 
 * @About: 新增接口、编辑接口页面 
 */
import React, { Component } from 'react';
import { Button, Select, Row, Col, Table, Input, Divider, Modal, Form } from 'antd';
import "../assets/styles/reset.less";
import http from '../utils/http';

const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;

let dataSource = []
for (let i = 0; i < 2; i++) {
  dataSource.push({
    key: i,
    name: `赵本山${i}`,
    type: 32,
    require: 1123,
    sign: 13213,
    note: 1231
  })
}

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

const AddSupplierForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增供应商"
          onCancel={onCancel}
          onOk={onCreate}
          okText="确定"
          cancelText="取消"
          className="reset-model"
        >
          <Form layout="inline">

            <Row>
              <FormItem label="供应商英文名">
                {getFieldDecorator('esName', {
                  rules: [{ required: true, message: '请输入供应商英文名!' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="供应商中文名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入供应商中文名!' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
);

const AddReqHeadForm = Form.create()(
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="新增请求头"
          onCancel={onCancel}
          onOk={onCreate}
          okText="确定"
          cancelText="取消"
          className="reset-model"
        >
          <Form layout="inline">
            <Row>
              <FormItem label="参数名">
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '请输入参数名!' }],
                })(
                  <Input />
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="参数类型">
                {getFieldDecorator('type', {
                  initialValue: '1',
                  rules: [{ required: true, message: '请输入供应商中文名!' }],
                })(
                  <Select >
                    <Option value="1">111</Option>
                    <Option value="2">222</Option>
                  </Select>
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="是否必须">
                {getFieldDecorator('require', {
                  initialValue: '1',
                  rules: [{ required: true, message: '请输入供应商中文名!' }],
                })(
                  <Select >
                    <Option value="1">是</Option>
                    <Option value="2">否</Option>
                  </Select>
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="是否参与签名">
                {getFieldDecorator('sign', {
                  initialValue: '1',
                  rules: [{ required: true, message: '请输入供应商中文名!' }],
                })(
                  <Select >
                    <Option value="1">是</Option>
                    <Option value="2">否</Option>
                  </Select>
                )}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="备注">
                {getFieldDecorator('note', {
                  rules: [{ required: false }],
                })(
                  <TextArea />
                )}
              </FormItem>
            </Row>
          </Form>
        </Modal>
      );
    }
  }
);

export default class InterfaceAdd extends Component {
  state = {
    addSupVisible: false,
    addReqHeadVisible: false,
    pageTitle: '',
    pageType: 1
  }
  goBack = () => {
    this.props.history.goBack();
  }

  //add supplier functions begin
  showModal = () => {
    this.setState({ addSupVisible: true });
  }
  handleCancel = () => {
    this.setState({ addSupVisible: false });
  }
  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ addSupVisible: false });
    });
  }
  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }
  //add supplier functions end

  //add request head functions begin
  showModal1 = () => {
    this.setState({ addReqHeadVisible: true });
  }
  handleCancel1 = () => {
    this.setState({ addReqHeadVisible: false });
  }
  handleCreate1 = () => {
    const form = this.formRef1.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ addReqHeadVisible: false });
    });
  }
  saveFormRef1 = (formRef) => {
    this.formRef1 = formRef;
  }
  //add request head functions end

  componentWillMount() {
    if(this.props.match.interfaceId !== undefined) {
      this.setState({
        pageTitle: '接口详情',
        pageType: 1
      })
    } else {
      this.setState({
        pageTitle: '新增接口',
        pageType: 2
      })
    }
  }

  componentDidMount() {
    console.log(this.props.match)
    // http.post(`/interface/`)
  }

  render() {
    const { pageType } = this.state
    return (
      <div className="interface-config">
        <h2 className="page_title">{this.state.pageTitle}
          <a onClick={this.goBack}>返回</a>
        </h2>
        <div className="page_cont">
          <Row>
            <Col span={3}>
              接口中文名称：
            </Col>
            <Col span={9}>
              <Input style={{ width: "80%" }} />
            </Col>
            <Col span={3}>
              接口英文名称：
            </Col>
            <Col span={9}>
              <Input style={{ width: "80%" }} />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              选择供应商：
            </Col>
            <Col span={17}>
              <Select defaultValue="all" style={{ width: '80%' }}>
                <Option value="all">选择供应商</Option>
                <Option value="1">聚信立</Option>
                <Option value="2">白骑士</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Button type="primary" onClick={() => { this.setState({ addSupVisible: true }) }} disabled={ pageType === 1 ? true : false }>新增供应商</Button>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              类型：
            </Col>
            <Col span={9}>
              <Select defaultValue="1" style={{ width: '80%' }}>
                <Option value="1">同步</Option>
                <Option value="2">异步</Option>
              </Select>
            </Col>
            <Col span={3}>
              状态：
            </Col>
            <Col span={9}>
              <Select defaultValue="1" style={{ width: '80%' }}>
                <Option value="1">有效</Option>
                <Option value="2">无效</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              计费方式：
            </Col>
            <Col span={9}>
              <Select defaultValue="1" style={{ width: '80%' }}>
                <Option value="1">查询</Option>
                <Option value="2">查得</Option>
                <Option value="3">包年</Option>
                <Option value="4">免费</Option>
                <Option value="5">其他</Option>
              </Select>
            </Col>
          </Row>
          <Divider></Divider>
          <Row>
            <Col span={3}>
              URL：
            </Col>
            <Col span={9}>
              <Input style={{ width: "80%" }} />
            </Col>
            <Col span={3}>
              映射URL：
            </Col>
            <Col span={9}>
              <Input style={{ width: "80%" }} />
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              请求方式：
            </Col>
            <Col span={9}>
              <Select defaultValue="1" style={{ width: '80%' }}>
                <Option value="1">GET</Option>
                <Option value="2">POST</Option>
              </Select>
            </Col>
            <Col span={3}>
              请求格式：
            </Col>
            <Col span={9}>
              <Select defaultValue="1" style={{ width: '80%' }}>
                <Option value="1">JSON</Option>
                <Option value="2">XML</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              加密方式：
            </Col>
            <Col span={9}>
              <Select defaultValue="1" style={{ width: '80%' }}>
                <Option value="1">111</Option>
                <Option value="2">222</Option>
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={3}>
              <Button type="primary" onClick={() => { this.setState({ addReqHeadVisible: true }) }} disabled={ pageType === 1 ? true : false }>新增请求头</Button>
            </Col>
          </Row>
          <Table dataSource={dataSource} columns={columns} bordered pagination={false}/>

          <Modal
            title="新增请求头"
            visible={this.state.addResHeadVisible}
            onOk={this.onAddResHeadOk}
            okText="确定"
            cancelText="取消"
            onCancel={this.onAddResHeadCancel}
          >
            <Row>
              <Col span={6} offset={2}>
                参数名：
              </Col>
              <Col span={12}>
                <Input ref={(input) => this.paraName = input} />
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={2}>
                参数类型：
              </Col>
              <Col span={12}>
                <Select defaultValue="1" style={{ width: "100%" }} ref="paraType">
                  <Option value="1">string</Option>
                  <Option value="2">int</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={2}>
                是否必须：
              </Col>
              <Col span={12}>
                <Select defaultValue="1" style={{ width: "100%" }} >
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={2}>
                是否参与签名：
              </Col>
              <Col span={12}>
                <Select defaultValue="1" style={{ width: "100%" }} >
                  <Option value="1">是</Option>
                  <Option value="2">否</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={6} offset={2}>
                备注：
              </Col>
              <Col span={12}>
                <TextArea></TextArea>
              </Col>
            </Row>
          </Modal>
          <AddSupplierForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.addSupVisible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
          <AddReqHeadForm
            wrappedComponentRef={this.saveFormRef1}
            visible={this.state.addReqHeadVisible}
            onCancel={this.handleCancel1}
            onCreate={this.handleCreate1}
          />
        </div>
      </div>
    )
  }
}