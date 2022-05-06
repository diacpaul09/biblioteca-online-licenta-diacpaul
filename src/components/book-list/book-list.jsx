import React from "react";
import Book from "../book/book";
import './book-list.scss'
const BookList = ({books}) => {
    return (<div className="most-readed">{books.map(book => (<Book key={book.id} author={book.author} title={book.title} price={book.price} image={book.image} />))}</div>)
}

export default BookList