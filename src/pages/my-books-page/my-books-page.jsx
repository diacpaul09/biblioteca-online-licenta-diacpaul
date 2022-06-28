import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selector";
import firebase from "../../firebase/firebase.utils";

import CurrentlyReading from "../../components/currently-reading/currently-reading";

import { MyBooksPageContainer }
    from './my-books-page.styles'
const MyBooksPage = ({ currentUser }) => {

    const [currentUserId, setCurrentUserID] = useState("")
    const [currentReadingBooks, setCurrentReadingBooks] = useState([]);

    const refCurrentlyReading = firebase.firestore().collection("currentlyReading");

    function getCurrentBooks() {
        setCurrentUserID(currentUser ? currentUser.id : null)

        if (currentUserId) {
            refCurrentlyReading.where("userId", "==", currentUserId).onSnapshot((querySnapshot) => {
                const items = [];
                querySnapshot.forEach((doc) => {
                    items.push({ id: doc.id, ...doc.data() });
                });
                setCurrentReadingBooks(items)
            });

        }
    }

    useEffect(() => {
        getCurrentBooks();
        // eslint-disable-next-line
    }, [currentUser, currentUserId])



    return (
        <MyBooksPageContainer>
            <div className="currently-reading">
                {currentReadingBooks[0] ?
                    currentReadingBooks.map(book =>
                        <CurrentlyReading
                            className="book-item"
                            key={book.id}
                            bookId={book.bookId}
                            pageNumber={book.currentPage}
                            numPages={book.numberOfPages} />) :
                    (<div className="no-books">You currently are not reading anything.</div>)
                }
            </div>
        </MyBooksPageContainer>
    )

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});



export default connect(mapStateToProps)(MyBooksPage);