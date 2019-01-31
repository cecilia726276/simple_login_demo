import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Layout, Button, message, Menu, Icon, Input, Form, Tooltip } from 'antd';
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

class Login extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
        this.state = {
            content:'',
            blank: false,
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

    handleSubmit = () => {
        let token = this.state.token;
        let content = this.state.content;
        if (content === ''|| content == null){
            console.log("empty: " + content);
            this.setState({blank: true})
        }else{
            console.log("message: " + content);
            let filter = {
                content: content
            };
            let url = "/user/sendMessage";
            let getInformation = prepareRequest(filter,url);

            axios(getInformation)
                .then(response => {

                    console.log(response);
                    let responseCode = response.data.code;
                    if (responseCode === 200) {
                        this.setState({
                            content: ''
                        })
                    } else {
                        message.error("发生未知错误，请重试！")
                    }
                })

        }
    }
    // handleEnterKey = (e) => {
    //     if(e.nativeEvent.keyCode === 13){ //e.nativeEvent获取原生的事件对像
    //         this.onSendText()
    //     }
    // };

    handlerChange = (e) =>{
        this.setState({blank: false})
        let newValue = e.target.value;
        this.setState({content: newValue});
    };

    onLogout = () => {
        cookie.remove('token', { path: '/' });
        message.success("Logout successfully!")
        let history = this.context.router.history;
        history.push(routes.LANDING);
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout style={{position: 'absolute', height: '100%', width:'100%'}}>
                <Sidebar/>
                {/*以下为聊天窗口界面*/}
                <Layout>
                    <Header style={{background: '#ffffff', height:'50px', lineHeight:'50px'}}>
                        公共聊天室
                    </Header>
                    <Content style={{ height: '400px', overflowY: 'scroll'  }}>
                        <MessageWindow/>
                    </Content>
                    <Footer style={{background: '#ffffff', width:'100%'}}>
                                <textarea value={this.state.content} onChange={this.handlerChange}
                                          style={{lineHeight:'22px', width:'100%',outline: 'none', border: '0', background: 'none', resize: 'none'}} rows={6} />
                        <Tooltip placement="topLeft" visible={this.state.blank} title="消息不能为空">
                            <Button style={{float: 'right'}} onClick={()=>this.handleSubmit()}>发送</Button>
                        </Tooltip>

                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
Login.contextTypes = {
    router: PropTypes.object.isRequired
};

const LoginPage = Form.create()(Login);
export default (props)=><LoginPage {...props} />