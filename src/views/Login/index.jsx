/*
 * @Author: Mcqueen.qiumaoyun 
 * @Date: 2018-04-20 14:53:20 
 * @About: 登陆页面 
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './login.less';
import { Input, Icon, Button, Form, Checkbox, Spin, message } from 'antd';
import { setUser } from '../../store/actions/loggedUserAction';
import http from '../../utils/http';

const FormItem = Form.Item;

const antIcon = <Icon type="loading" style={{ fontSize: 36 }} spin />;

const Login = Form.create()(
  class extends Component {
    state = {
      loading: false
    }
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.setState({
            loading: true
          });
          http.post('/login', values)
          .then(res => {
            this.setState({ loading: false });
            if(res.code !== 1) {
              message.error(`${res.err}`)
            } else {
              this.props.dispatch(setUser(res.userInfo));
              sessionStorage.setItem('token', '123');
              sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo));
              message.success('登陆成功，即将跳转', () => {
                this.props.history.replace('/');
              });
            }
          })
        }
      });
    }
    componentWillMount() {
      sessionStorage.removeItem('token');
    }
  
    componentDidMount() {
      // this.props.dispatch('123');
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <div className="login_cont">
          <div className="login_box">
            <h2>三方数据接口管理平台</h2>
            <Spin indicator={antIcon} spinning={this.state.loading}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('userName', {
                    rules: [{ required: true, message: '请输入账号!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: '请输入密码!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>记住账号</Checkbox>
                  )}
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登陆
                  </Button>
                </FormItem>
              </Form>
            </Spin>
          </div>
        </div>
      )
    }
  }

)

const mapStateToProps = state => ({
  logState: state
})

export default connect(mapStateToProps)(Login);
