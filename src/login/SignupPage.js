import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Checkbox, Button, message, Popover
} from 'antd';
import * as routes from "../router/MainPages";
import axios from "axios/index";
import PropTypes from "proptypes";

const passwordRules =
    "最短6位，最长16位 \n" +
    "可以包含小写大母[a-z]和大写字母[A-Z] \n " +
    "可以包含数字 [0-9] \n " +
    "可以包含下划线 [ _ ] 和减号 [ - ]";

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
            autoCompleteResult: [],
        };
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let filter={
                    username:values.userName,
                    password:values.password,
                };

                let temp = '';
                for (let it in filter){
                    temp += encodeURIComponent(it) + '=' + encodeURIComponent(filter[it])+ '&'
                }
                let getInformation ={
                    method:"POST",
                    url:"/user/register",
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    /* axios 会自动进行json格式转换 */
                    data: temp,
                };
                //注意：/xxx/xxx的方法名对应于后台Controller层中的RequestMapping
                axios(getInformation)
                    .then(response => {

                        console.log(response);
                        let responseCode = response.data.code;
                        if (responseCode === 200){
                            let history = this.context.router.history;
                            message.success("注册成功！");
                            history.push(routes.SIGN_IN);
                        } else if (responseCode === 1001){
                            message.error("该用户已存在！")
                        } else{
                            message.error("发生未知错误，请重试！")
                        }
                    })
            }
        });
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    };
    validateUsername = (rule,value,callback) =>{
        const form = this.props.form;
        let pattern = /^.{8,15}$/;
        if (!pattern.test(value)){
            callback('请输入8-15位长度的用户名')
        }
        callback();
    };
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        let pattern = /^[\w_-]{6,16}$/;
        if (!pattern.test(value)){
            //form.validateFields(['conf'], {force:true});
            callback('请输入符合规范的密码');
        }

        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };


        render()
        {
            const {getFieldDecorator} = this.props.form;

            const formItemLayout = {
                labelCol: {
                    xs: {span: 24},
                    sm: {span: 8},
                },
                wrapperCol: {
                    xs: {span: 24},
                    sm: {span: 16},
                },
            };
            const tailFormItemLayout = {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0,
                    },
                    sm: {
                        span: 16,
                        offset: 8,
                    },
                },
            };

            return (
                <div style={{ marginLeft:'15%', marginTop:'100px', width:'60%'}} >
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            label={(
                                <span>
              Username&nbsp;
                                    <Tooltip title="请输入8-15位长度的用户名">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                            )}
                        >
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: true, message: 'Please input your username!', whitespace: true
                                }, {
                                    validator: this.validateUsername}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label={(
                            <span>
              Password&nbsp;
                                <Tooltip title={passwordRules} >
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
                        )}
                        >
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: true, message: 'Please input your password!',
                                },{
                                    validator: this.validateToNextPassword,
                                }],
                            })(
                                <Input type="password"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Confirm Password"
                        >
                            {getFieldDecorator('confirm', {
                                rules: [{
                                    required: true, message: 'Please confirm your password!',
                                }, {
                                    validator: this.compareToFirstPassword,
                                }],
                            })(
                                <Input type="password" onBlur={this.handleConfirmBlur}/>
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('agreement', {
                                valuePropName: 'checked',
                                rules:[{
                                    required: true, message:'Please check the agreement!',
                                }]}
                            )(
                                <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                            )}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </Form.Item>
                    </Form>
                </div>
            );
        }
}
Signup.contextTypes = {
    router: PropTypes.object.isRequired
};
const SignupPage = Form.create()(Signup);
export default (props)=><SignupPage {...props} />