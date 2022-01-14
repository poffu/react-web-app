import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login'
import ListUser from './ListUser'
import AddUser from './AddUser'
import EditUser from './EditUser'

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/list-user" component={ListUser} />
                    <Route exact path="/add-user" component={AddUser} />
                    <Route exact path="/edit-user" component={EditUser} />
                </Switch>
            </BrowserRouter>
        );
    }
}