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
        <div className="App">
            {(token === null) ? <Login /> : <ListUser />}
        </div>
    );
}