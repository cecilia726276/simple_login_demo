import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import axios from 'axios';
import {prepareRequest} from './Authentication';
import PropTypes from "proptypes";
import * as routes from '../router/MainPages';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.state = {
        };
    }

    componentWillMount() {
        this.state =  { token: cookie.load('token') };
        let token = cookie.load('token');
        console.log('token'+ token);
        let undefinedToken = (token === "undefined") || typeof(token) == "undefined";

        if (!undefinedToken){
            let filter = {
                token: token
            };
            let url = "/user/authentication";
            let getInformation = prepareRequest(filter,url);

            axios(getInformation)
                .then(response => {

                    console.log(response);
                    let responseCode = response.data.code;
                    if (responseCode === 200) {
                        let history = this.context.router.history;
                        history.push(routes.SIGN_IN);
                    } else if (responseCode === 1001) {
                        this.onLogout();
                    } else {
                        message.error("发生未知错误，请重试！")
                    }
                })
        }
    }

    onLogin(token) {
        this.setState({ token });
        cookie.save('token', token, { path: '/' })
        console.log('Saved token: ', token);
    }

    onLogout() {
        cookie.remove('token', { path: '/' })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);
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
                    url:"/user/login",
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
                            let token = response.data.data.token;
                            console.log("First token: ", token);
                            this.onLogin(token);
                            //cookie.remove('userId');
                            let history = this.context.router.history;
                            history.push(routes.SIGN_IN);
                        } else if (responseCode === 1001){
                            let error = response.data.data.ERRORS;
                            message.error(error);
                        } else{
                            alert("Error!")
                        }
                    })
            }
        });

    };

    render() {
        const { getFieldDecorator } = this.props.form;
            return (
                <div style={{width: '300px', margin: 'auto', marginTop: '100px'}}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('userName', {
                                rules: [{required: true, message: 'Please input your username!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       placeholder="Username"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{required: true, message: 'Please input your Password!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                                       placeholder="Password"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}
                                    className="login-form-button">
                                Log in
                            </Button>
                            Or <Link to={routes.SIGN_UP}>register now!</Link>
                        </Form.Item>
                    </Form>
                </div>
            );
    }
}

Landing.contextTypes = {
    router: PropTypes.object.isRequired
};
const LandingPage = Form.create()(Landing);
export default (props)=><LandingPage {...props} />