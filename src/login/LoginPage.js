import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Layout, Button, message, Menu, Icon, Input } from 'antd';
import cookie from "react-cookies";
import * as routes from "../router/MainPages";
import PropTypes from "proptypes";
import {prepareRequest} from "./Authentication";
import axios from "axios/index";
import Sidebar from "../messages/Sidebar";
import MessageWindow from "../messages/MessageWindow";

const { TextArea } = Input;
const {
    Header, Footer, Content,
} = Layout;

class LoginPage extends Component {
    constructor(props) {
        super(props);

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

    onLogout = () => {
        cookie.remove('token', { path: '/' });
        message.success("Logout successfully!")
        let history = this.context.router.history;
        history.push(routes.LANDING);
    }

    render() {
        return (
            <Layout style={{position: 'absolute', height: '100%', width:'100%'}}>
                <Sidebar/>
                {/*以下为聊天窗口界面*/}
                <Layout>
                    <Header style={{background: '#ffffff'}}>
                        公共聊天室
                    </Header>
                    <Content>
                        <MessageWindow/>
                        Chat Content
                        ChatWindow(history) + MemberList(all members)
                    </Content>
                    <Footer style={{background: '#ffffff'}}><TextArea style={{border: '0px', background: 'none', resize: 'none'}}rows={6} /></Footer>
                </Layout>
            </Layout>
        );
    }
}
LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};
export default LoginPage;