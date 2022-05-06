import React from "react";

import './book.scss'

const Book = ({ author, title, price, image }) => {

    return (
        <div className="book">
            <div className="menu-item">
                <div
                    className='background-image'
                    style={{
                        backgroundImage: `url(${image})`
                    }}
                />

            </div>
            <div className='content'>
                <h1 className='title'>{title}</h1>
                <div>{author}</div>
                <div>${price}</div>
                <span className='subtitle'>Read NOW</span>
            </div>
        </div>)
}

export default Book