import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import ListUser from './ListUser';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { useSelector } from 'react-redux';
import { getToken } from "./redux/auth";

export default function App() {
    let token = useSelector(getToken);
    return (
        < BrowserRouter >
            <Switch>
                <Route exact path="/list-user" component={ListUser} />
                <Route exact path="/add-user" component={AddUser} />
                <Route exact path="/edit-user" component={EditUser} />
            </Switch>
            <div className="App">
                {(token === null) ? <Login /> : <ListUser />}
            </div>
        </BrowserRouter>
    );
}