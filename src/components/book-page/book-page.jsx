import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './book-page.scss'
import firebase from "../../firebase/firebase.utils";
import { Button } from "@mui/material";

const BookPage = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const bookIdDesc = location.state.id
    
    const ref = firebase.firestore().collection("bookDescription");

    const [description, setDescription] = useState('');

    function getDescription() {

        ref.where("bookId", "==", bookIdDesc).onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() });
            });
            setDescription(items);
        });
    }

    useEffect(() => {
        getDescription();
        // eslint-disable-next-line
    }, []);


    

    return (
        <div className="book-page">
            <div className="menu-item">
                <div
                    className='background-image'
                    style={{
                        backgroundImage: `url(${location.state.image})`
                    }}
                />
            </div>

            <div className="description">
                <h1 className=" title">{location.state.title}</h1>
                <h2 className="author">{location.state.author}</h2>
                <h3>{location.state.genre}</h3>

                <div>{description.length!==0 ? description[0].desc : "Loading..."}</div>

                <div className="buttons">
                    <Button className="button" variant="contained" onClick={()=>navigate('/reading', {state:{title:location.state.title}})} fullWidth>Read now</Button>
                    {
                        location.state.isAudible ?
                            <Button className="button" variant="contained" fullWidth> Listen now</Button>
                            : null
                    }
                </div>
            </div>


        </div>
    )

}
export default BookPage