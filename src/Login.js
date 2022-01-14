import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ValidateInput } from './css/js/main'

export default function Login() {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState([]);

    const handleSubmit = e => {
        e.preventDefault();
        let txtError = [];
        let validateEmail = ValidateInput("Email", data.email, "^[\\w]+@[a-z]+\\.[a-z]+$");
        let validatePassword = ValidateInput("Password", data.password);
        validateEmail ? txtError.push(validateEmail) : txtError = [...txtError];
        validatePassword ? txtError.push(validatePassword) : txtError = [...txtError];
        if (txtError.length === 0) {
            const params = {
                email: data.email,
                password: data.password,
            };
            axios.post(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_LOGIN, params).then(response => {
                if (response.data !== null) {
                    sessionStorage.setItem(process.env.REACT_APP_SESSION_LOGIN, JSON.stringify(response.data));
                }
            }).catch(err => {
                if (err.response) {
                    txtError.push(err.response.data['detail']);
                } else if (err.request) {
                    txtError.push("Server is maintain.");
                }
                data.password = "";
            });
        } else {
            data.password = "";
        }
        setError(txtError);
    }

    const setParams = (event) => {
        event.persist();
        setData((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    }

    if (sessionStorage.getItem(process.env.REACT_APP_SESSION_LOGIN) !== null) {
        return <Redirect to={process.env.REACT_APP_URL_LIST_USER} />;
    }

    return (
        <div className="container-contact100">
            <div className="wrap-contact100">
                <form className="contact100-form validate-form" onSubmit={handleSubmit}>
                    <span className="contact100-form-title">
                        Login
                    </span>
                    {error.length > 0 &&
                        <div className="mb-4">
                            <span className="text-danger text-center font-weight-bold input100">
                                {error.map((err, id) => <div key={id}>{err}</div>)}
                            </span>
                        </div>
                    }
                    <div className="wrap-input100 validate-input">
                        <span className="label-input100">Email</span>
                        <input className="input100" type="text" name="email" placeholder="Enter your email" value={data.email} onChange={setParams} />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <span className="label-input100">Password</span>
                        <input className="input100" type="password" name="password" placeholder="Enter your password" value={data.password} onChange={setParams} />
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