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

        const subbedAt = new Date();

        if (isUserSubscribed[0]) {
            const subItem = doc(db, "subscribedUsers", isUserSubscribed[0].id);

            await updateDoc(subItem, {
                subType: value,
                subbedAt

            });
        }
        else {
            await addDoc(collection(db, "subscribedUsers"), {
                userId: currentUser.id,
                subType: value,
                subbedAt
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
        getSubs();

        // eslint-disable-next-line
    }, [currentUserID]);




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
            <div className="test-warning">*Please use the following credit card for payment
                <br />4242 4242 4242 4242
                <br />exp: 01/34
                <br />CVV: 123
            </div>

        </div>


    )

}


const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});


export default connect(mapStateToProps)(SubscribePage);
