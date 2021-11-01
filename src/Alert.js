import React, { Component } from "react";
import './css/css/alert.css'
import { Link } from "react-router-dom";

export default class Alert extends Component {

    render() {
        return (
            <div className="CustomConfirmParent" id="alertBox">
                <div className="CustomConfirmBody">
                    <div className="ConfirmTitle">Notification</div>
                    <div className="ConfirmMessage">
                        <span id="messageAlert">{this.props.message}</span>
                    </div>
                    <div className="ConfirmFooter px-3 pt-4 text-center">
                        <Link to="/" className="ConfirmButton btn btn-primary">OK</Link>
                    </div>
                </div>
            </div>
        );
    }
}