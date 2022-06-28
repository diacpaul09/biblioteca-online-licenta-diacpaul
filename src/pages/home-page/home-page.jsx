import React, { useEffect, useState } from "react";
import './home-page.scss'
import firebase from "../../firebase/firebase.utils";
import SearchBox from "../../components/search-box/search-box";
import BookList from "../../components/book-list/book-list";

const HomePage = () => {

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
        ref.onSnapshot((querySnapshot) => {
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
            <BookList
                books={books}
                searchByValue={searchByValue}
                searchByType={searchByType} />
        </div>
    )
}

export default HomePage