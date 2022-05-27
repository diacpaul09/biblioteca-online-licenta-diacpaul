import React, { useState, useEffect } from "react";
import SearchBox from "../../components/search-box/search-box";
import BookList from "../../components/book-list/book-list";
import firebase from "../../firebase/firebase.utils";



const AudioBooksPage = () => {

    const [books, setBooks] = useState([]);
    const [searchByValue, setSearchByValue] = useState('');
    const [searchByType, setSearchByType] = useState('Book Name');

    const handleChangeSearchByType = (value) => {
        return setSearchByType(value);
    }

    const handleChangeSearchByValue = (value) => {
        return setSearchByValue(value);
    }


    const ref = firebase.firestore().collection("books");

    function getBooks() {
        ref.where("isAudible", "==", true).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setBooks(items);
        });
    }

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line
    }, []);
    return (
        <div className="home-page">

            <SearchBox
                handleChangeSearchByValue={handleChangeSearchByValue}
                handleChangeSearchByType={handleChangeSearchByType}
                searchByType={searchByType}
            />

            <BookList books={books} searchByValue={searchByValue} searchByType={searchByType} />
        </div>
    )
}
export default AudioBooksPage