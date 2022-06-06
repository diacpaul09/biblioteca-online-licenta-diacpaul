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
import {
    HeaderContainer,
} from './header.styles';


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
        <HeaderContainer>
            <div className='title'>
                <Link to='/'>
                    <Logo className="logo" />
                </Link>
                <h1 className="title-name" onClick={() => navigate('/')}>Online Library </h1>
            </div>
            <div className="buttons">

                <div className='button'>
                    <Link to='/'>
                        <Button className="buttonstyle" variant="contained">Home</Button>
                    </Link>
                </div>
                <div className='button'>
                    <Link to='/audio-books'>
                        <Button className="buttonstyle" variant="contained">Audio Books</Button>
                    </Link>
                </div>


                <div className='button'>
                    <Link to={currentUser ? '/subscribe' : '/signin'}>
                        <Button className="buttonstyle" variant='contained' >
                            Subscribe
                        </Button>
                    </Link>
                </div>
                {currentUser ? (
                    <div className='sign-in-and-sign-up-and-sign-out'>
                        <div className='button'>

                            <Dropdown >
                                <Dropdown.Toggle className="buttonstyle" id="dropdown-basic">
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
                                <Button className="buttonstyle" variant='contained' >
                                    SIGN IN
                                </Button>
                            </Link>
                        </div>
                        <div className='button'>
                            <Link className='option' to='/signup'>
                                <Button className="buttonstyle" variant='contained' >
                                    SIGN UP
                                </Button>
                            </Link>
                        </div>
                    </div>

                )}

            </div>
        </HeaderContainer >
    )
}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,

});

export default connect(mapStateToProps)(Header);