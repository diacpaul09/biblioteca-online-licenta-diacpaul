import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkMark from '../../assets/checkmark.svg'
import { Button } from "@mui/material";
import './successfull-sign-in.scss'


const SuccessfulSignIn = ({ currentUser }) => {

    const navigate = useNavigate()


    useEffect(() => {
        if (!currentUser)
            navigate('/');
        // eslint-disable-next-line
    }, []);

    return (
        <div className="successfull-log-in">
            <div className="title">You have successfully signed in!</div>
            <img
                className="checkmark"
                src={checkMark}
                alt="check mark" />
            <div className="buttons">
                <div className='button'>
                    <Button variant="contained" onClick={() => navigate('/')}>Home</Button>
                </div>
                <div className='button'>
                    <Button variant="contained" onClick={() => navigate('/myProfile')}>My Profile</Button>
                </div>
                <div className='button'>
                    <Button variant="contained" onClick={() => navigate('/myBooks')}>My Books</Button>
                </div>
                
                
            </div>
        </div>
    )
}

export default SuccessfulSignIn