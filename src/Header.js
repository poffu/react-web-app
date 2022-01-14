import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
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
                                    <Link to="/list-user" className="nav-link text-black">Home</Link>
                                </li>
                                <li className="nav-item fw-bold">
                                    <Link to="/add-user" className="nav-link text-black">Add User</Link>
                                </li>
                                <li className="nav-item fw-bold">
                                    <Link to="/" className="nav-link text-black" onClick={() => sessionStorage.removeItem(process.env.REACT_APP_SESSION_LOGIN)}>Logout</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </header >
    );
}