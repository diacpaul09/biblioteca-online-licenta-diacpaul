import './header.scss'
import React from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user.selector';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';



const Header = ({ currentUser }) => {
    const navigate = useNavigate();

    const userFunctions = [
        {
            id: 1,
            name: "My Profile"
        },
        {
            id: 2,
            name: "My Books"
        },
        {
            id: 3,
            name: "My Cart"
        },
        {
            id: 4,
            name: "Log Out"
        }
    ];

    const handleLogOut = () => {
        navigate("/")
        return auth.signOut();
    }

    const handleUserFunctions = (value) => {
        switch (value) {
            case "Log Out":
                return handleLogOut();
            case "My Profile":
                return navigate("/myProfile");
            case "My Books":
                return navigate("/myBooks")
            default:
                return;
        }

    }


    return (
        <div className="header">
            <div className='title'>
                <Link to='/'>
                    <Logo className="logo" />
                </Link>
                <h1 className="title-name">Online Library </h1>
            </div>
            <div className="buttons">

                <div className='button'>
                    <Link to='/'>
                        <Button variant="contained">Home</Button>
                    </Link>
                </div>
                <div className='button'>
                    <Button variant="contained">Audio Books</Button>
                </div>
                
                <div className='button'>
                    <Button variant="contained">Donate</Button>
                </div>
                <div className='button'>
                    <Link to={currentUser ? '/subscribe' : '/signin'}>
                        <Button variant='contained' >
                            Subscribe
                        </Button>
                    </Link>
                </div>
                {currentUser ? (
                    <div className='sign-in-and-sign-up-and-sign-out'>
                        <div className='button'>

                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    {currentUser.displayName}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {
                                        userFunctions.map(item =>
                                        (
                                            <Dropdown.Item key={item.id} onClick={() => handleUserFunctions(item.name)}>
                                                {item.name}
                                            </Dropdown.Item>
                                        )
                                        )
                                    }

                                </Dropdown.Menu>
                            </Dropdown>

                        </div>
                    </div>

                ) : (
                    <div className='sign-in-and-sign-up-and-sign-out'>
                        <div className='button'>
                            <Link className='option' to='/signin'>
                                <Button variant='contained' >
                                    SIGN IN
                                </Button>
                            </Link>
                        </div>
                        <div className='button'>
                            <Link className='option' to='/signup'>
                                <Button variant='contained' >
                                    SIGN UP
                                </Button>
                            </Link>
                        </div>
                    </div>

                )}

            </div>
        </div >
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,

});

export default connect(mapStateToProps)(Header);