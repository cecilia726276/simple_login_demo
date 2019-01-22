import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Layout, Button, message } from 'antd';
import cookie from "react-cookies";
import * as routes from "../router/MainPages";
import PropTypes from "proptypes";
const {
    Header, Footer, Sider, Content,
} = Layout;

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
        this.state = {
        };
    }
    onLogout = () => {
        cookie.remove('token', { path: '/' });
        message.success("Logout successfully!")
        let history = this.context.router.history;
        history.push(routes.LANDING);
    }

    render() {
        return (
            <div>
                <Header>
                    <Button onClick={()=>this.onLogout()}>Logout</Button>
                </Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </div>
        );
    }
}
LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};
export default LoginPage;