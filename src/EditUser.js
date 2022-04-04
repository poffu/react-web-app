import React, { useState, useEffect } from 'react';
import Header from './Header';
import axios from 'axios';
import { ValidateForm } from './css/js/main';
import Alert from './Alert';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from './redux/auth';

export default function EditUser() {
    const [data, setData] = useState({
        userId: 0,
        email: '',
        name: '',
        tel: '',
        password: '',
        passwordConfirm: '',
    });
    const [isRedirect, setIsRedirect] = useState(false);
    const [alert, setAlert] = useState('');
    const [error, setError] = useState([]);
    const token = useSelector(getToken);

    useEffect(() => {
        async function getDataAPI() {
            var userId = sessionStorage.getItem(process.env.REACT_APP_SESSION_EDIT);
            if (userId === null) {
                setIsRedirect(true);
            } else {
                await axios({
                    method: 'get',
                    url: `${process.env.REACT_APP_URL_API}${process.env.REACT_APP_URL_GET_USER}`,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'content-type': 'application/json'
                    },
                    params: { userId }
                }).then(response => {
                    let user = response.data;
                    setData({
                        ...data,
                        userId: user.userId,
                        email: user.email,
                        name: user.name,
                        tel: user.tel,
                    });
                }).catch((err) => {
                    if (err.response) {
                        setAlert(err.response.data['detail']);
                    } else if (err.request) {
                        localStorage.clear();
                        setAlert('Server is maintain');
                    }
                });
                sessionStorage.removeItem(process.env.REACT_APP_SESSION_EDIT);
            }
        }
        getDataAPI();
    }, []);

    if (isRedirect) {
        return <Redirect to={process.env.REACT_APP_URL_LIST_USER} />;
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let txtError = ValidateForm(data);
        if (txtError.length === 0) {
            let params = {
                userId: data.userId,
                email: data.email,
                name: data.name,
                tel: data.tel,
                password: data.password,
            };
            await axios({
                method: 'put',
                url: process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_EDIT_USER,
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
            userId: data.userId,
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
                            Edit User
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
            </div >
        </div >
    );
}