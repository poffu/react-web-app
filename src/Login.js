import React, { Component } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ValidateInput } from './css/js/main'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: [],
            isLogin: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setParams = this.setParams.bind(this);
    }

    setParams = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        var txtEmail = this.state.email;
        var txtPassword = this.state.password;
        var txtError = [];
        var validateEmail = ValidateInput("Email", txtEmail, "^[\\w]+@[a-z]+\\.[a-z]+$");
        var validatePassword = ValidateInput("Password", txtPassword);
        if (validateEmail.length > 0) {
            txtError.push(validateEmail);
        }
        if (validatePassword.length > 0) {
            txtError.push(validatePassword);
        }
        this.setState({ error: txtError });
        if (txtError.length == 0) {
            const data = {
                email: txtEmail,
                password: txtPassword,
            };

            axios.post(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_LOGIN, data).then(response => {
                if (response.data !== null) {
                    sessionStorage.setItem(process.env.REACT_APP_SESSION_LOGIN, JSON.stringify(response.data));
                    this.setState({ isLogin: true });
                } else {
                    txtError.push("Username or Password is not correct.");
                    this.setState({ error: txtError });
                }
            }).catch(err => {
                console.error(err);
                txtError.push("Server is maintain.");
                this.setState({ error: txtError });
            });
        }
        this.state.password = "";
    }

    render() {
        if (this.state.isLogin || sessionStorage.getItem(process.env.REACT_APP_SESSION_LOGIN) != null) {
            return <Redirect to={process.env.REACT_APP_URL_LIST_USER} />;
        }

        const errors = this.state.error;
        return (
            <div className="container-contact100">
                <div className="wrap-contact100">
                    <form className="contact100-form validate-form" onSubmit={this.handleSubmit}>
                        <span className="contact100-form-title">
                            Login
                        </span>
                        {errors.length > 0 &&
                            <div className="mb-4">
                                <span className="text-danger text-center font-weight-bold input100">
                                    {errors.map((error, index) => <div key={index}>{error}</div>)}
                                </span>
                            </div>
                        }

                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" name="email" placeholder="Enter your email" value={this.state.email} onChange={this.setParams} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="password" name="password" placeholder="Enter your password" value={this.state.password} onChange={this.setParams} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="container-contact100-form-btn">
                            <div className="wrap-contact100-form-btn">
                                <div className="contact100-form-bgbtn"></div>
                                <button className="contact100-form-btn">
                                    <span>
                                        Submit
                                        <i className="fa fa-long-arrow-right m-l-7" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}