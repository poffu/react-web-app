import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/css/list-user.css';
import Header from './Header';
import Alert from './Alert'
import { Link, Redirect } from "react-router-dom";

export default function ListUser() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [confirm, setConfirm] = useState("");
    const [alert, setAlert] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [listPage, setListPage] = useState([]);

    if (sessionStorage.getItem(process.env.REACT_APP_SESSION_LOGIN) == null) {
        return <Redirect to={process.env.REACT_APP_URL_LOGIN} />;
    }

    const getUserServer = async () => {
        await axios.get(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_LIST_USER, {
            params: {
                name,
            }
        }).then(response => {
            let userList = response.data;
            setUsers([...userList]);
            setCurrentPage(1);
            setListPage([...getListPage(userList)]);
        });
    }

    useEffect(async () => {
        getUserServer();
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        getUserServer();
    }

    const handleCancel = e => {
        sessionStorage.removeItem(process.env.REACT_APP_SESSION_DELETE);
        setConfirm("");
    }

    const handleOK = async e => {
        e.preventDefault();
        await axios.delete(process.env.REACT_APP_URL_API + process.env.REACT_APP_URL_DELETE_USER, {
            params: {
                userId: sessionStorage.getItem(process.env.REACT_APP_SESSION_DELETE),
            }
        }).then(response => {
            if (response.data) {
                setAlert("Success");
            }
            else {
                setAlert("Failure");
            }
        }).catch(err => {
            console.error(err);
        });
        sessionStorage.removeItem(process.env.REACT_APP_SESSION_DELETE);
        setConfirm("");
    }

    const getListPage = (userList) => {
        let listPage = [];
        if (userList != null) {
            for (let i = 1; i <= Math.ceil(userList.length / 8); i++) {
                listPage.push(i);
            }
        }
        return listPage;
    }

    return (
        <div>
            <Header />
            {confirm != "" &&
                <div className="CustomConfirmParent" id="alertConfirm">
                    <div className="CustomConfirmBody">
                        <div className="ConfirmTitle">Notification</div>
                        <div className="ConfirmMessage">
                            <span id="messageAlert">{confirm}</span>
                        </div>
                        <div className="ConfirmFooter d-flex justify-content-between px-3 pt-4 text-end">
                            <button className="ConfirmButton btn btn-primary" onClick={handleOK}>OK</button>
                            <button className="ConfirmButton btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            }
            {alert != "" &&
                <Alert message={alert} />
            }
            <div className="container-contact100" style={{ minHeight: "92vh" }}>
                <div className="wrap-contact100" style={{ width: "1000px" }}>
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input className="form-control me-2 input-search" name="name" onChange={e => setName(e.target.value)} value={name} placeholder="Enter keyword" />
                        <button className="btn btn-outline-success ml-3" type="submit">Search name</button>
                    </form>
                    <div className="mt-4">
                        <table className="table">
                            <thead className="container-fluid">
                                <tr>
                                    <th scope="col" style={{ width: "10%" }}>#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col" style={{ width: "15%" }}>Tel</th>
                                    <th scope="col" style={{ width: "12%" }}>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.slice((currentPage - 1) * 8, currentPage * 8).map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row" className="text-center" style={{ wordBreak: "break-all" }}>{index + (currentPage - 1) * 8 + 1}</th>
                                        <td style={{ wordBreak: "break-all" }}>{user.name}</td>
                                        <td style={{ wordBreak: "break-all" }}>{user.email}</td>
                                        <td style={{ wordBreak: "break-all" }}>{user.tel}</td>
                                        <td className="d-flex justify-content-around border-0">
                                            <Link to="/edit-user" className="btn btn-success btn-sm rounded-0" type="button" onClick={() => sessionStorage.setItem(process.env.REACT_APP_SESSION_EDIT, user.userId)}><i className="fa fa-edit" /></Link>
                                            <button className="btn btn-danger btn-sm rounded-0" type="button" onClick={
                                                () => {
                                                    setConfirm("Do you want to delete this?");
                                                    sessionStorage.setItem(process.env.REACT_APP_SESSION_DELETE, user.userId);
                                                }
                                            } ><i className="fa fa-trash" /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                {currentPage > 1 &&
                                    <li className="page-item">
                                        <a className="page-link" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}><span aria-hidden="true">&laquo;</span></a>
                                    </li>
                                }
                                {listPage && listPage.slice(currentPage - 1, currentPage + 2).map((page, index) => (
                                    (currentPage === page ? (
                                        <li className="page-item" key={index}>
                                            <a className="page-link text-white" style={{ backgroundColor: "#2D78B2" }}>{page}</a>
                                        </li>
                                    ) : (
                                        <li className="page-item" key={index}>
                                            <a className="page-link" onClick={() => setCurrentPage(page)}>{page}</a>
                                        </li>
                                    ))
                                ))}
                                {currentPage < listPage.length &&
                                    <li className="page-item">
                                        <a className="page-link" onClick={() => setCurrentPage(currentPage + 1)}><span aria-hidden="true">&raquo;</span></a>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </div >
    );
}