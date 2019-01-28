import React, { Component } from 'react';
import { Input, Avatar, Layout, Button, message, Menu, Icon } from 'antd';
import * as routes from "../router/MainPages";
import cookie from "react-cookies";
import PropTypes from "proptypes";
import LoginPage from "../login/LoginPage";

const Search = Input.Search;
const{ Sider, Footer} = Layout;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.state = {};
    }

    onLogout = () => {
        cookie.remove('token', { path: '/' });
        message.success("Logout successfully!");
        let history = this.context.router.history;
        history.push(routes.LANDING);
    };

    render(){
        return(
            <Sider style={{height: 'calc(100vh - 30px)'}}
                breakpoint="lg"
                   collapsedWidth="0"
                   onBreakpoint={(broken) => { console.log(broken); }}
                   onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                <div class='notlogout' style={{ height: '100%'}}>
                <div className="avatarUsername" style={{ height:'60px', width: '100%'}}>
                    <Avatar size="large" icon="user" style={{ float: 'left', marginLeft: '10px', marginTop:'10px'}}/>
                    <div style={{ width:'70%', float:'left', color:'#ffffff',marginTop:'20px' }}>用户名aaaaaaaaa</div>
                </div>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: '80%' }}
                    />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span className="nav-text">nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">nav 3</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">nav 4</span>
                    </Menu.Item>
                </Menu>
                </div>
                <div style={{background:'#001529'}} >
                <Button
                    icon="poweroff"
                    type="primary"
                    style={{borderColor: 'transparent', height:'30px', background:'#001529'}}
                    onClick={()=>this.onLogout()}
                    block>Log Out
                </Button>
                </div>
            </Sider>

        )
    }
}
Sidebar.contextTypes = {
    router: PropTypes.object.isRequired
};
export default Sidebar;