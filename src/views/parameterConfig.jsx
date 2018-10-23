/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:53:33 
 * @About: 参数配置页面 
 */
import React, { Component } from 'react';
import { Button, Table, Form, Modal, Row, Input } from 'antd';
import '../assets/styles/views/parameterConfig.less';
const FormItem = Form.Item;

let dataSource = []
for (let i = 0; i < 2; i++) {
	dataSource.push({
		key: i,
		name: `赵本山${i}`,
		esname: 32,
		supply: 1123,
		type: 13213,
		status: i%2
	})
}

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
		dataIndex: 'type',
		key: 'type',
	}, {
		title: '状态',
		dataIndex: 'status',
		key: 'status',
	}, {
		title: '操作',
		key: 'action',
		render: (text, record) => (
			<span>
				<a onClick={() => goToModify(record)} style={{margin: '0 20px'}}>编辑</a>
				<a onClick={() => showConfirm(record)}>删除</a>
			</span>
		),
	}
];

function goToModify() {}

function showConfirm() {}

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

export default class ParameterConfig extends Component {
	state = {
		addSupVisible: false
	}

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
	
	componentDidMount() {
		console.log(`page3 loaded already.`);
	}
	render() {
		return (
			<div className="parameter-config">
				<h2 className="page_title">接口配置</h2>
				<div className="page_cont">
					<div className="set_item">
						<h3 className="sm_title">供应商配置</h3>
						<div className="btn_div">
							<Button className="add_btn" type="primary" icon="plus" onClick={() => { this.setState({ addSupVisible: true }) }}>添加</Button>
						</div>
						<Table dataSource={dataSource} columns={columns} bordered pagination={false}/>

					</div>

					<div className="set_item">
					<h3 className="sm_title">计费方式配置</h3>
					<div className="btn_div">
							<Button className="add_btn" type="primary" icon="plus" >添加</Button>
						</div>
					<Table dataSource={dataSource} columns={columns} bordered pagination={false}/>
					</div>

					<div className="set_item">
					<h3 className="sm_title">加密方式配置</h3>
					<div className="btn_div">
							<Button className="add_btn" type="primary" icon="plus" >添加</Button>
						</div>
					<Table dataSource={dataSource} columns={columns} bordered pagination={false}/>
					</div>

					<div className="set_item">
					<h3 className="sm_title">参数类型配置</h3>
					<div className="btn_div">
							<Button className="add_btn" type="primary" icon="plus" >添加</Button>
						</div>
					<Table dataSource={dataSource} columns={columns}  bordered pagination={false}/>
					</div>

					<AddSupplierForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.addSupVisible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />

				</div>
			</div>
		)
	}
}