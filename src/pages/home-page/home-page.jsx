import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import './home-page.scss'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "../../firebase/firebase.utils";
import Book from "../../components/book/book";

const HomePage = () => {
    const [searchByValue, setSearchByValue] = useState('');

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    const ref = firebase.firestore().collection("books");

    const dropDownItems = [
        {
            id: 1,
            name: "Author"
        },
        {
            id: 2,
            name: "Genre"
        },
        {
            id: 3,
            name: "Book name"
        }
    ];

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

    return (
        <div>
            <div className="search-books">
                <h3>Search by </h3>
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        {
                            searchByValue ?
                                searchByValue :
                                "Search by"
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            dropDownItems.map(
                                item => (
                                    <Dropdown.Item key={item.id} onClick={() => setSearchByValue(item.name)}>
                                        {item.name}
                                    </Dropdown.Item>
                                )
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Input className="input" type="text" />
            </div>

            <div className="most-readed">{books.map(book => (<Book key={book.id} author={book.author} title={book.title} price={book.price} image={book.image} />))}</div>
        </div>
    )
}

export default HomePage