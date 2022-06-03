import React, { useState, useEffect } from "react";
import './my-profile.scss'
import firebase from "../../firebase/firebase.utils";

import { selectCurrentUser } from "../../redux/user/user.selector";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import { InputUnstyled } from "@mui/base";
import { Input } from "@mui/material";

const MyProfile = ({ currentUser }) => {

    const refSub = firebase.firestore().collection("subscribedUsers");
    const [currentUserID, setCurrentUserID] = useState("")
    const [isUserSubscribed, setIsUserSubscribed] = useState([])
    const [daysToPayment, setDaysToPayment] = useState(0);

    function getSubs() {

        setCurrentUserID(currentUser ? currentUser.id : null)

        if (currentUserID) {



            refSub.where("userId", "==", currentUserID).onSnapshot((querySnapshot) => {
                const items = [];

                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                if (items[0]) {
                    const date = items[0].subbedAt.toDate()
                    const now = new Date();
                    const oneDay = 24 * 60 * 60 * 1000;
                    const diffDays = Math.round(Math.abs((date - now) / oneDay));
                    setDaysToPayment(diffDays)

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
        getSubs();

        // eslint-disable-next-line
    }, [currentUserID]);

    return (

        <div className="profile-info">
            {currentUser ?
                <div>
                    <div className="name">
                        Display name :
                        <Input className="input" value={currentUser.displayName ? currentUser.displayName : "n"} />
                    </div>
                    <div className="email">
                        Email:
                        <Input className="input" value={currentUser.email} />
                    </div>
                </div> :
                <div>

                </div>
            }

            {
                isUserSubscribed[0] ?
                    <div className="sub-type">
                        You currently are subscribed to {isUserSubscribed[0].subType} plan.
                    </div> : <div> You are not subscribed to any plan.</div>
            }

            {
                isUserSubscribed[0] ?
                    <div className="days-to-payment">
                        Days to payment <Input className="input" value={30 - daysToPayment} />
                    </div> : <div></div>
            }
        </div>

    );

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(MyProfile);