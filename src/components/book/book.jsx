
import React from "react";
import { useNavigate } from "react-router-dom";

import './book.scss'

const Book = ({ id, author, title, price, image, genre, isAudible }) => {

    const navigate = useNavigate();

    const str = title.replaceAll(',', '').replace(/\s+/g, '').toLowerCase();

    


    return (


        <div className="book" onClick={() =>
            // <Navigate to="/bookpage"  replace />
            navigate(`/bookpage/${str}`, { state: { id, author, title, price, image, genre, isAudible } })
        }
        >
            <div className="menu-item">
                <div
                    className='background-image'
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                />

            </div>

            <div className='content' >
                <h1 className='title'>{title}</h1>
                <div>{author}</div>
                <div>${price}</div>
                <div>{genre}</div>
            </div>


        </div >

    )
}

export default Book