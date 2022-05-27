import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../../firebase/firebase.utils";

import './currently-reading.scss'

const CurrentlyReading = ({ bookId, pageNumber, numPages }) => {


    const bookRef = firebase.firestore().collection("books");

    const [books, setBooks] = useState([])

    const navigate = useNavigate();

    function getBooks() {

        bookRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                if (doc.id === bookId) {
                    items.push({ id: doc.id, ...doc.data() })
                }
            });
            setBooks(items)
        });
    }

    useEffect(() => {
        getBooks();
        // eslint-disable-next-line
    }, [])



    return (<div>{
        books[0] ?
            < div className="book-info" >
                <div className="menu-item">

                    <div
                        className='background-image'
                        style={{
                            backgroundImage: `url(${books[0].image})`
                        }}
                    />
                </div>
                <div className="content">
                    <div className="title" > {books[0].title}</div >
                    <div className="author">{books[0].author}</div>
                    <div className="genre">{books[0].genre}</div>
                    <div className="current-page">Current page: {pageNumber} of {numPages}</div>
                    <div className="button">

                        <Button variant="contained" onClick={()=>navigate(`/reading/${bookId}`,
                            { state: { id: bookId, title:books[0].title } })}> Continue reading</Button>

                    </div>
                </div>


            </div >
            : "Loading"}</div>


    )
}

export default CurrentlyReading