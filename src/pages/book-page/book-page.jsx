import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import firebase from "../../firebase/firebase.utils";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

import { BookPageContainer } from './book-page.styles'

const BookPage = ({ currentUser }) => {

    const location = useLocation();
    const [isUserSubscribed, setIsUserSubscribed] = useState([])

    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [currentUserID, setCurrentUserID] = useState("")

    const bookIdDesc = location.state.id

    const ref = firebase.firestore().collection("bookDescription");
    const refSub = firebase.firestore().collection("subscribedUsers");


    function getDescription() {
        setCurrentUserID(currentUser ? currentUser.id : null)


        ref.where("bookId", "==", bookIdDesc).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setDescription(items);
        });

        if (currentUserID) {
            refSub.orderBy("subbedAt", "desc").where("userId", "==", currentUserID).onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                if (items[0]) {
                    const date = items[0].subbedAt.toDate()
                    const now = new Date();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const diffDays = Math.round(Math.abs((date - now) / oneDay));


                    if (diffDays <= 90 && items[0].subType === "Ultra-Premium") {
                        setIsUserSubscribed(items);
                    } else if (diffDays <= 30) {
                        setIsUserSubscribed(items);
                    }
                    else {
                        querySnapshot.forEach((doc) => {
                            if (doc.id === items[0].id) {
                                doc.ref.delete();
                            }
                        })
                    }
                }

            });
        }

    }

    useEffect(() => {
        getDescription();
        // eslint-disable-next-line
    }, [currentUser, currentUserID]);



    return (
        <BookPageContainer>
            <div className="book-page">
                <div className="menu-item">
                    <div
                        className='background-image'
                        style={{
                            backgroundImage: `url(${location.state.image})`
                        }}
                    />
                </div>

                <div className="description">
                    <h1 className=" title">{location.state.title}</h1>
                    <h2 className="author">{location.state.author}</h2>
                    <h3>{location.state.genre}</h3>

                    <div>{description.length !== 0 ? description[0].desc : "Loading..."}</div>

                    <div className="buttons">
                        <Button className="button" variant="contained" onClick={() => {
                            if (currentUserID) {
                                if (isUserSubscribed[0]) {
                                    navigate(`/reading/${location.state.id}`,
                                        { state: { id: location.state.id, author: location.state.author, title: location.state.title } })
                                }
                                else {
                                    navigate("/subscribe")
                                }
                            }
                            else {
                                navigate('/signin')
                            }
                        }} fullWidth>Read now</Button>
                        {
                            location.state.isAudible ?

                                <Button className="button" variant="contained" onClick={() => {
                                    if (currentUserID) {
                                        if (isUserSubscribed[0]) {
                                            navigate(`/audio-page`,
                                                { state: { id: location.state.id, author: location.state.author, title: location.state.title } })
                                        }
                                        else {
                                            navigate("/subscribe")
                                        }
                                    }
                                    else {
                                        navigate('/signin')
                                    }
                                }} fullWidth > Listen now</Button>
                                :
                                null
                        }
                    </div>
                </div>
            </div >
        </BookPageContainer>

    )

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,

});

export default connect(mapStateToProps)(BookPage);