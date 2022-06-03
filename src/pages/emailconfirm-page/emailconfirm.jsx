import React, { useEffect, useState } from "react";

import './emailconfirm.scss'

const EmailConfirm = () => {



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



export default EmailConfirm;