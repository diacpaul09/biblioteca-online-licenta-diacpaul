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
            <div
                className="search-books"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80)`
                }}>
                
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">
                        {/* {
                            searchByValue ?
                                searchByValue :
                                "Search by"
                        } */}
                        Search by
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
                <Input color="primary" disableUnderline='true' className="input" type="text" placeholder={`${searchByValue}`}/>
            </div>

            <div className="most-readed">{books.map(book => (<Book key={book.id} author={book.author} title={book.title} price={book.price} image={book.image} />))}</div>
        </div>
    )
}

export default HomePage