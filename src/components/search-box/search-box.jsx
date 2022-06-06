import React from "react";
import { Input } from "@mui/material";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';

import {
    SearchBoxContainer,
} from './searchbox.styles';


const SearchBox = ({ handleChangeSearchByValue, handleChangeSearchByType, searchByType }) => {


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


    return (
        <SearchBoxContainer>
            <div
                className="search-books"
                style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&w=1000&q=80)`
                }}>

                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic">

                        Search by
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            dropDownItems.map(
                                item => (
                                    <Dropdown.Item
                                        key={item.id}
                                        onClick={() => handleChangeSearchByType(item.name)}
                                    >
                                        {item.name}
                                    </Dropdown.Item>
                                )
                            )
                        }
                    </Dropdown.Menu>
                </Dropdown>
                <Input
                    color="primary"
                    disableUnderline={true}
                    className="input" type="text"
                    placeholder={`${searchByType}`}
                    onChange={(e) => handleChangeSearchByValue(e.target.value)}
                />

            </div>
        </SearchBoxContainer>);
}

export default SearchBox