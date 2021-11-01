import React, { useState, useEffect } from "react";
import Header from './Header'
import axios from 'axios';
import { ValidateInput, ValidatePasswordConfirm } from './css/js/main'
import Alert from './Alert'
import { Redirect } from 'react-router-dom';

export default function EditUser() {
    const [data, setData] = useState({
        userId: 0,
        email: '',
        name: '',
        tel: '',
        password: '',
        passwordConfirm: '',
    });
    const [redirect, setRedirect] = useState(false);
    const [alert, setAlert] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(async () => {
        var userId = sessionStorage.getItem(process.env.REACT_APP_SESSION_EDIT);
        if (userId == null) {
            setRedirect(true);
        }
        else {
            axios.get(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_GET_USER, {
                params: {
                    userId: userId,
                }
            }).then(response => {
                setData(response.data);
                sessionStorage.removeItem(process.env.REACT_APP_SESSION_EDIT);
            }).catch(err => {
                console.error(err);
                setErrors("Server is maintain.");
            });
        }
    }, []);

    if (redirect) {
        return <Redirect to={process.env.REACT_APP_URL_LIST_USER} />;
    }

    const handleSubmit = (evt) => {
        console.log(data)
        evt.preventDefault();
        var txtUserId = data.userId;
        var txtEmail = data.email;
        var txtName = data.name;
        var txtTel = data.tel;
        var txtPassword = data.password;
        var txtPasswordConfirm = data.passwordConfirm;
        var txtError = [];
        var validateEmail = ValidateInput("Email", txtEmail, "^[\\w]+@[a-z]+\\.[a-z]+$");
        var validateName = ValidateInput("Name", txtName, "^[A-Za-z\\s]+$")
        var validateTel = ValidateInput("Tel", txtTel, "^[0][0-9]{9}$")
        var validatePassword = "";
        var validatePasswordConfirm = "";
        if (txtPassword != "" && txtPassword != undefined) {
            validatePassword = ValidateInput("Password", txtPassword, "^.*(?=.)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$");
            validatePasswordConfirm = ValidatePasswordConfirm(txtPassword, txtPasswordConfirm);
        }
        if (validateEmail != "") {
            txtError.push(validateEmail)
        }
        if (validateName != "") {
            txtError.push(validateName)
        }
        if (validateTel != "") {
            txtError.push(validateTel)
        }
        if (validatePassword != "") {
            txtError.push(validatePassword)
        }
        if (validatePasswordConfirm != "") {
            txtError.push(validatePasswordConfirm)
        }
        if (txtError.length == 0) {
            const data = {
                userId: txtUserId,
                email: txtEmail,
                name: txtName,
                tel: txtTel,
                password: txtPassword,
            };
            axios.put(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_EDIT_USER, data).then(response => {
                if (response.data == 'exist') {
                    txtError.push("Email is exist.")
                    setErrors(txtError);
                } else if (response.data) {
                    setAlert("Success");
                } else {
                    setAlert("Failure");
                }
            }).catch(err => {
                console.error(err);
                txtError.push("Server is maintain.");
                setErrors(txtError);
            });
        } else {
            setErrors(txtError);
            data.password = '';
            data.passwordConfirm = '';
        }
    }

    const setParams = (event) => {
        event.persist();
        setData((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div>
            <Header />
            {alert != '' &&
                <Alert message={alert} />
            }
            <div className="container-contact100" style={{ minHeight: "93vh" }}>
                <div className="wrap-contact100">
                    <form className="contact100-form validate-form" onSubmit={handleSubmit}>
                        <span className="contact100-form-title">
                            Edit User
                        </span>
                        {errors.length > 0 &&
                            <div className="mb-4">
                                <span className="text-danger text-center font-weight-bold input100">
                                    {errors.map((error, index) => <div key={index}>{error}</div>)}
                                </span>
                            </div>
                        }

                        <input type="hidden" name="userId" value={data.userId} />
                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Email</span>
                            <input className="input100" type="text" name="email" placeholder="Enter your email" value={data.email} onChange={setParams} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Name</span>
                            <input className="input100" type="text" name="name" placeholder="Enter your name" value={data.name} onChange={setParams} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Tel</span>
                            <input className="input100" type="text" name="tel" placeholder="Enter your tel" value={data.tel} onChange={setParams} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Password</span>
                            <input className="input100" type="password" name="password" placeholder="Enter your password" value={data.password} onChange={setParams} />
                            <span className="focus-input100"></span>
                        </div>

                        <div className="wrap-input100 validate-input">
                            <span className="label-input100">Password Confirm</span>
                            <input className="input100" type="password" name="passwordConfirm" placeholder="Enter your password confirm" value={data.passwordConfirm} onChange={setParams} />
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
            </div >
        </div >
    );
}