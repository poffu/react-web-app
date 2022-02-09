import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import { ValidateInput, ValidatePasswordConfirm } from './css/js/main';
import Alert from './Alert';
import { useSelector } from 'react-redux';
import { getToken } from './redux/auth';

export default function AddUser() {
    const [data, setData] = useState({
        email: '',
        name: '',
        tel: '',
        password: '',
        passwordConfirm: '',
    });
    const [alert, setAlert] = useState('');
    const [error, setError] = useState([]);
    const token = useSelector(getToken);

    const handleSubmit = async e => {
        e.preventDefault();
        let txtError = [];
        let validateEmail = ValidateInput('Email', data.email, '^[\\w]+@[a-z]+\\.[a-z]+$');
        let validateName = ValidateInput('Name', data.name, '^[A-Za-z\\s]+$');
        let validateTel = ValidateInput('Tel', data.tel, '^[0][0-9]{9}$');
        let validatePassword = ValidateInput('Password', data.password, '^.*(?=.)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$');
        let validatePasswordConfirm = ValidatePasswordConfirm(data.password, data.passwordConfirm);
        validateEmail ? txtError.push(validateEmail) : txtError = [...txtError];
        validateName ? txtError.push(validateName) : txtError = [...txtError];
        validateTel ? txtError.push(validateTel) : txtError = [...txtError];
        validatePassword ? txtError.push(validatePassword) : txtError = [...txtError];
        validatePasswordConfirm ? txtError.push(validatePasswordConfirm) : txtError = [...txtError];
        if (txtError.length === 0) {
            let params = {
                email: data.email,
                name: data.name,
                tel: data.tel,
                password: data.password,
            };
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_URL_API}${process.env.REACT_APP_URL_ADD_USER}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'content-type': 'application/json'
                },
                data: params
            }).then(response => {
                if (response.data) {
                    setAlert('Success');
                } else {
                    setAlert('Failure');
                }
            }).catch(err => {
                if (err.response) {
                    txtError.push(err.response.data['detail']);
                } else if (err.request) {
                    localStorage.clear();
                    txtError.push('Server is maintain.');
                }
                cleanData(txtError);
            });
        } else {
            cleanData(txtError);
        }
    }

    const setParams = (event) => {
        event.persist();
        setData((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    }

    const cleanData = txtError => {
        setError(txtError);
        setData({
            email: data.email,
            name: data.name,
            tel: data.tel,
            password: '',
            passwordConfirm: '',
        });
    }

    return (
        <div>
            <Header />
            {alert !== '' &&
                <Alert message={alert} />
            }
            <div className="container-contact100" style={{ minHeight: "93vh" }}>
                <div className="wrap-contact100">
                    <form className="contact100-form validate-form" onSubmit={handleSubmit}>
                        <span className="contact100-form-title">
                            Add User
                        </span>
                        {error.length > 0 &&
                            <div className="mb-4">
                                <span className="text-danger text-center font-weight-bold input100">
                                    {error.map((error, index) => <div key={index}>{error}</div>)}
                                </span>
                            </div>
                        }
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
            </div>
        </div >
    );
}