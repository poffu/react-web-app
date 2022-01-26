import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import ListUser from './ListUser';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { useSelector } from 'react-redux';
import { getToken } from "./redux/auth";

export default function App() {
    const [url, setUrl] = useState("");
    let token = useSelector(getToken);
    let urlCurrent = window.location.pathname;

    useEffect(() => {
        if (token === null) {
            setUrl(process.env.REACT_APP_URL_ROOT);
        } else {
            if (urlCurrent === process.env.REACT_APP_URL_ROOT || urlCurrent === process.env.REACT_APP_URL_LOGIN) {
                setUrl(process.env.REACT_APP_URL_LIST_USER);
            } else {
                setUrl(urlCurrent);
            }
        }
    }, []);

    return (
        < BrowserRouter >
            <Switch>
                <Route exact path={process.env.REACT_APP_URL_ROOT} component={Login} />
                <Route exact path={process.env.REACT_APP_URL_LOGIN} component={Login} />
                <Route exact path={process.env.REACT_APP_URL_LIST_USER} component={ListUser} />
                <Route exact path={process.env.REACT_APP_URL_ADD_USER} component={AddUser} />
                <Route exact path={process.env.REACT_APP_URL_EDIT_USER} component={EditUser} />
            </Switch>
            <div className="App">
                <Redirect to={url} />
            </div>
        </BrowserRouter>
    );
}