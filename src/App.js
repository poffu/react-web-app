import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import ListUser from './ListUser';
import AddUser from './AddUser';
import EditUser from './EditUser';
import { useSelector } from 'react-redux';
import { getToken } from './redux/auth';

export default function App() {
    const [url, setUrl] = useState('');
    const token = useSelector(getToken);
    const urlCurrent = window.location.pathname;

    useEffect(() => {
        let hours = 1;
        let saved = localStorage.getItem('saved');
        if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
            localStorage.clear();
        }
        if (token === undefined || token === null) {
            setUrl(process.env.REACT_APP_URL_LOGIN);
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
            <div className="App">
                <Redirect to={url} />
            </div>
            <Switch>
                <Route exact path={process.env.REACT_APP_URL_LOGIN} component={Login} />
                <Route exact path={process.env.REACT_APP_URL_LIST_USER} component={ListUser} />
                <Route exact path={process.env.REACT_APP_URL_ADD_USER} component={AddUser} />
                <Route exact path={process.env.REACT_APP_URL_EDIT_USER} component={EditUser} />
            </Switch>
        </BrowserRouter>
    );
}