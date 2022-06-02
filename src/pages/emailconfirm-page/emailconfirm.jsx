import React, { useEffect, useState } from "react";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import './emailconfirm.scss'

const EmailConfirm = ({ currentUser }) => {




    const [myTime, setMyTime] = useState(new Date());

    function tick() {
        setMyTime(new Date());
        window.location.reload(false);
    }

    useEffect(() => {

        var timerID = setInterval(() => tick(), 5000);
        return () => clearInterval(timerID);
    }, [myTime]);



    return (
        <div className="page">
            <div className="email-confirm">A confimartion email has been sent to your address.</div>
            <div className="email-confirm">Please check your inbox and confirm your account.</div>
        </div>
    )

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,

});

export default connect(mapStateToProps)(EmailConfirm);