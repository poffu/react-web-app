import {memo} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearToken, getToken } from "./redux/auth";

function Header() {
    const token = useSelector(getToken);
    const dispatch = useDispatch();

    const logOut = () => {
        localStorage.clear();
        dispatch(clearToken(token));
    };

    return (
        <header>
            <div className="container-fluid p-0">
                <nav className="navbar navbar-expand-lg bg-light">
                    <div className="container-fluid">
                        <label className="navbar-brand">Web User</label>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" style={{ fontSize: "28px" }}>
                            <span className="navbar-toggler-icon">
                                <i className="fa fa-navicon"></i>
                            </span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item fw-bold">
                                    <Link to={process.env.REACT_APP_URL_LIST_USER} className="nav-link text-black">Home</Link>
                                </li>
                                <li className="nav-item fw-bold">
                                    <Link to={process.env.REACT_APP_URL_ADD_USER} className="nav-link text-black">Add User</Link>
                                </li>
                                <li className="nav-item fw-bold">
                                    <Link to={process.env.REACT_APP_URL_LOGIN} className="nav-link text-black" onClick={logOut}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header >
    );
}

export default memo(Header);