import React, { useState, useEffect } from "react";
import SubscribeItem from "../../components/subscribe-item/subscribe-item";
import firebase, { db } from "../../firebase/firebase.utils";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore/lite";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";

import './subscribe-page.scss'

const SubscribePage = ({ currentUser }) => {



    const [isUserSubscribed, setIsUserSubscribed] = useState([])
    const refSub = firebase.firestore().collection("subscribedUsers");

    const [subs, setSubs] = useState([]);

    const ref = firebase.firestore().collection("subscriptions");

    const [currentUserID, setCurrentUserID] = useState("")

    const handleClickSubscribeButton = async (value) => {


        if (isUserSubscribed[0]) {
            const subItem = doc(db, "subscribedUsers", isUserSubscribed[0].id);

            await updateDoc(subItem, {
                subType: value
            });
        }
        else {
            await addDoc(collection(db, "subscribedUsers"), {
                userId: currentUser.id,
                subType: value
            }).then(function (res) {
               
            }).catch(function (err) {
                
            })
        }
    }






    function getSubs() {

        setCurrentUserID(currentUser ? currentUser.id : null)


        if (currentUserID) {

            ref.orderBy("price").onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setSubs(items);
            });

            refSub.where("userId", "==", currentUserID).onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setIsUserSubscribed(items);

            });
        }



    }

    useEffect(() => {
        getSubs();
        // eslint-disable-next-line
    }, [currentUser, currentUserID]);


    return (
        <div className="subscribe-page">

            <h2 className="title">Subscribe Now!</h2>
            <h3 className="title">Chose a plan:</h3>
            <div className="subscribe-item">
                {
                    subs.map(
                        sub => <SubscribeItem
                            key={sub.id}
                            desc={sub.desc}
                            price={sub.price}
                            type={sub.type}
                            handleClickSubscribeButton={handleClickSubscribeButton} />
                    )
                }
            </div>
            {
                isUserSubscribed[0] ?
                    <h3 className="title">You currently are subscribed to {isUserSubscribed[0].subType} plan</h3>
                    :
                    <div> </div>
            }

        </div>
    )

}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(SubscribePage);
