
import React, { useEffect, useState } from "react";
import StripeCheckoutButton from "../stripe-button/stripe-button.component"
import './subscribe-item.scss'

const SubscribeItem = ({ price, type, desc, handleClickSubscribeButton }) => {

    const [success, setSuccess] = useState(false)




    useEffect(() => {
        if (success === true) { handleClickSubscribeButton(type); setSuccess(false) }
    }, [success])
    return (
        <div className="subscribe-item">
            <div className='content' >
                <h3 className='type'>{type}</h3>
                <div className="desc">{desc}</div>
                <div className="price">{type === "Ultra-Premium" ? `Price/3 months: $${price}` : `Price/1 month: $${price}`}</div>
                <div className="sub-button">

                    <StripeCheckoutButton
                        success={success}
                        setSuccess={setSuccess}
                        price={price} />
                </div>
            </div>
        </div >
    )
}

export default SubscribeItem