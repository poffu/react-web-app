import React from "react";
import './css/css/alert.css'
import { Link } from "react-router-dom";

export default function Alert(props) {
    return (
        <div className="CustomConfirmParent" id="alertBox">
            <div className="CustomConfirmBody">
                <div className="ConfirmTitle">Notification</div>
                <div className="ConfirmMessage">
                    <span id="messageAlert">{props.message}</span>
                </div>
                <div className="ConfirmFooter px-3 pt-4 text-center">
                    <Link to={process.env.REACT_APP_URL_ROOT} className="ConfirmButton btn btn-primary">OK</Link>
                </div>
            </div>
        </div>
    );
}