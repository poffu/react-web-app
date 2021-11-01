import React, { Component } from "react";
import Header from './Header'
import axios from 'axios';
import { ValidateInput, ValidatePasswordConfirm } from './css/js/main'
import Alert from './Alert'
import { Redirect } from 'react-router-dom';

export default class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            name: "",
            tel: "",
            password: "",
            passwordConfirm: "",
            error: [],
            alert: "",
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
        var txtName = this.state.name;
        var txtTel = this.state.tel;
        var txtPassword = this.state.password;
        var txtPasswordConfirm = this.state.passwordConfirm;
        var txtError = [];
        var validateEmail = ValidateInput("Email", txtEmail, "^[\\w]+@[a-z]+\\.[a-z]+$");
        var validateName = ValidateInput("Name", txtName, "^[A-Za-z\\s]+$")
        var validateTel = ValidateInput("Tel", txtTel, "^[0][0-9]{9}$")
        var validatePassword = ValidateInput("Password", txtPassword, "^.*(?=.)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$");
        var validatePasswordConfirm = ValidatePasswordConfirm(txtPassword, txtPasswordConfirm);
        if (validateEmail.length > 0) {
            txtError.push(validateEmail)
        }
        if (validateName.length > 0) {
            txtError.push(validateName)
        }
        if (validateTel.length > 0) {
            txtError.push(validateTel)
        }
        if (validatePassword.length > 0) {
            txtError.push(validatePassword)
        }
        if (validatePasswordConfirm.length > 0) {
            txtError.push(validatePasswordConfirm)
        }
        if (txtError.length == 0) {
            const data = {
                email: txtEmail,
                name: txtName,
                tel: txtTel,
                password: txtPassword,
            };

            axios.post(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_ADD_USER, data).then(response => {
                if (response.data == 'exist') {
                    txtError.push("Email is exist.")
                    this.setState({ error: txtError });
                } else if (response.data) {
                    this.setState({ alert: "Success" });
                } else {
                    this.setState({ alert: "Failure" });
                }
            }).catch(err => {
                console.error(err);
                txtError.push("Server is maintain.");
                this.setState({ error: txtError });
            });
        }
        this.setState({ error: txtError, password: '', passwordConfirm: '' });
    }

    render() {
        if (sessionStorage.getItem(process.env.REACT_APP_SESSION_LOGIN) == null) {
            return <Redirect to={process.env.REACT_APP_URL_LOGIN} />;
        }
        const errors = this.state.error;
        const alert = this.state.alert;

        return (
            <div>
                <Header />
                {alert != '' &&
                    <Alert message={alert} />
                }
                <div className="container-contact100" style={{ minHeight: "93vh" }}>
                    <div className="wrap-contact100">
                        <form className="contact100-form validate-form" onSubmit={this.handleSubmit}>
                            <span className="contact100-form-title">
                                Add User
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
                                <span className="label-input100">Name</span>
                                <input className="input100" type="text" name="name" placeholder="Enter your name" value={this.state.name} onChange={this.setParams} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Tel</span>
                                <input className="input100" type="text" name="tel" placeholder="Enter your tel" value={this.state.tel} onChange={this.setParams} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Password</span>
                                <input className="input100" type="password" name="password" placeholder="Enter your password" value={this.state.password} onChange={this.setParams} />
                                <span className="focus-input100"></span>
                            </div>

                            <div className="wrap-input100 validate-input">
                                <span className="label-input100">Password Confirm</span>
                                <input className="input100" type="password" name="passwordConfirm" placeholder="Enter your password confirm" value={this.state.passwordConfirm} onChange={this.setParams} />
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
            </div >
        );
    }
}