import React from "react";
import Book from "../book/book";
import {
    BookListContainer,
} from './book-list.styles';



const BookList = ({ books, searchByValue = "", searchByType }) => {



    return (
        <BookListContainer>

            <div className="most-readed">

                {
                    books.filter(book => {

                        if (searchByType === 'Author') {
                            return book.author.toLowerCase().includes(searchByValue.toLowerCase())
                        }
                        if (searchByType === 'Genre') {
                            return book.genre.toLowerCase().includes(searchByValue.toLowerCase())
                        }
                        return book.title.toLowerCase().includes(searchByValue.toLowerCase())
                    }).map(book => (<Book
                        key={book.id}
                        id={book.id}
                        author={book.author}
                        title={book.title}
                        price={book.price}
                        image={book.image}
                        genre={book.genre}
                        isAudible={book.isAudible}
                    />))
                }
            </div>
        </BookListContainer>
    )
}

export default BookList