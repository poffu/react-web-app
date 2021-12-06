import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { ValidateInput } from './css/js/main'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        let txtError = [];
        const validateEmail = ValidateInput("Email", email, "^[\\w]+@[a-z]+\\.[a-z]+$");
        const validatePassword = ValidateInput("Password", password);
        validateEmail ? txtError.push(validateEmail) : txtError = [...txtError];
        validatePassword ? txtError.push(validatePassword) : txtError = [...txtError];
        if (txtError.length == 0) {
            const data = {
                email,
                password,
            };
            await axios.post(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_LOGIN, data).then(response => {
                if (response.data !== null) {
                    sessionStorage.setItem(process.env.REACT_APP_SESSION_LOGIN, JSON.stringify(response.data));
                }
            }).catch(err => {
                if (err.response) {
                    txtError.push(err.response.data['detail']);
                } else if (err.request) {
                    txtError.push("Server is maintain.");
                }
                setPassword("");
            });
        } else {
            setPassword("");
        }
        setError(txtError);
    }

    if (sessionStorage.getItem(process.env.REACT_APP_SESSION_LOGIN) != null) {
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
                        <input className="input100" type="text" name="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <span className="label-input100">Password</span>
                        <input className="input100" type="password" name="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} />
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