import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
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
                            username:values.username,
                            password:values.password,
                };
                let getInformation ={
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    /* json格式转换 */
                    body:JSON.stringify(filter)
                };
                //注意：/org/find的方法名对应于后台Controller层中的RequestMapping
                fetch('http://localhost:3432/user/login',getInformation)
                    .then(response => {

                        console.log(response);
                    })
                    .then(json =>{
                        // 返回的数据类型
                        console.log(json);
                       /* this.setState({
                            object:json.object.list
                        })*/
                    });

                let history = this.context.router.history;
                history.push(routes.SIGN_IN);
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