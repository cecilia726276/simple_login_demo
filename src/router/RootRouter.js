import React, { Component } from 'react';
import { Button } from 'antd';
import {Route, Switch} from 'react-router-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import history from './history';
import * as routes from './MainPages';
import LandingPage from '../login/LandingPage';
import SignupPage from '../login/SignupPage';
import LoginPage from '../login/LoginPage';
import Logout from '../login/Logout';

class RootRouter extends Component{
    render(){
        return(
            <div>
                <BrowserRouter history = {history}>
                    <Switch>
                        <Route exact path={routes.LANDING}
                               component={() => <LandingPage authUser={this.props.authUser}/>}/>
                        <Route exact path={routes.SIGN_UP}
                               component={() => <SignupPage authUser={this.props.authUser}/>}/>
                        <Route exact path={routes.SIGN_IN}
                               component={() => <LoginPage authUser={this.props.authUser}/>}/>
                        <Route exact path={routes.LOG_OUT}
                               component={() => <Logout authUser={this.props.authUser}/>}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default RootRouter;