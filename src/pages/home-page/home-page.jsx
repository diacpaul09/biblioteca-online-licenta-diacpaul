import React, { useEffect, useState } from "react";
import './home-page.scss'
import firebase from "../../firebase/firebase.utils";
import Book from "../../components/book/book";
import SearchBox from "../../components/search-box/search-box";
import BookList from "../../components/book-list/book-list";

const HomePage = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection("books");



    function getSchools() {
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setBooks(items);
            setLoading(false);
        });
    }

    useEffect(() => {
        getSchools();
        // eslint-disable-next-line
    }, []);

    console.log(books)

    return (
        <div className="home-page">
            <SearchBox books={books} />
            <BookList books={books} />
        </div>
    )
}

export default HomePage