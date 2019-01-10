import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Layout } from 'antd';
const {
    Header, Footer, Sider, Content,
} = Layout;

class LoginPage extends Component {
    render() {
        return (
            <div>
                <Header>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </div>
        );
    }
}

export default LoginPage;