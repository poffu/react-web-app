import {memo} from "react";
import './css/css/alert.css';
import { Link } from "react-router-dom";

function Alert({message}) {
    return (
        <div className="CustomConfirmParent" id="alertBox">
            <div className="CustomConfirmBody">
                <div className="ConfirmTitle">Notification</div>
                <div className="ConfirmMessage">
                    <span id="messageAlert">{message}</span>
                </div>
                <div className="ConfirmFooter px-3 pt-4 text-center">
                    <Link to={process.env.REACT_APP_URL_LIST_USER} className="ConfirmButton btn btn-primary" onClick={() => window.location.reload()}>OK</Link>
                </div>
            </div>
        </div>
    );
}

export default memo(Alert);