import { Button } from "@mui/material";
import React from "react";

import './subscribe-item.scss'

const SubscribeItem = ({ price, type, desc, handleClickSubscribeButton }) => {

    return (
        <div className="subscribe-item">
            <div className='content' >
                <h3 className='type'>{type}</h3>
                <div className="desc">{desc}</div>
                <div className="price">{type === "Ultra-Premium" ? `Price/3 months: $${price}` : `Price/1 month: $${price}`}</div>
                <div className="sub-button">
                    <Button variant="contained" onClick={
                        () => {
                            handleClickSubscribeButton(type);
                        }
                    }
                    >Subscribe</Button>
                </div>
            </div>
        </div>
    )
}

export default SubscribeItem