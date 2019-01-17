import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import axios from 'axios';
import PropTypes from "proptypes";
import * as routes from '../router/MainPages';
import { Link } from 'react-router-dom';
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let filter={
                            username:values.userName,
                            password:values.password,
                };

                let ret = '';
                for (let it in filter){
                    ret += encodeURIComponent(it) + '=' + encodeURIComponent(filter[it])+ '&'
                }
                let getInformation ={
                    method:"POST",
                    url:"/user/login",
                    headers:{
                        'Content-type': 'application/x-www-form-urlencoded'
                    },
                    /* axios 会自动进行json格式转换 */
                    data: ret,
                };
                //注意：/xxx/xxx的方法名对应于后台Controller层中的RequestMapping
                axios(getInformation)
                    .then(response => {

                        console.log(response);
                        let responseCode = response.data.code;
                        if (responseCode === 200){
                            let history = this.context.router.history;
                            history.push(routes.SIGN_IN);
                        } else if (responseCode === 1001){
                            alert("Wrong password!");
                        } else{
                            alert("Error!")
                        }

                    })
                    .then(error =>{
                        // 返回的数据类型
                        console.log(error);
                    });


            }
        });

    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div style={{width: '300px', margin: 'auto', marginTop:'100px' }}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
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
                    <Button type="primary" htmlType="submit" style={{ width: '100%'}}className="login-form-button">
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