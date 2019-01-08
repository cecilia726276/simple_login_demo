import React, { Component } from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';

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
                    Or <a href="/">register now!</a>
                </Form.Item>
            </Form>
            </div>
        );
    }
}
const LandingPage = Form.create()(Landing);
export default (props)=><LandingPage {...props} />