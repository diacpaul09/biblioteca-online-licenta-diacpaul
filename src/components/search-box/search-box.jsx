import React, {useState} from "react";
import { Input } from "@mui/material";
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.css';
import './search-box.scss'

const SearchBox = () => {
    const [searchByValue, setSearchByValue] = useState('');

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
    return (<div
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
                            <Dropdown.Item key={item.id} onClick={() => setSearchByValue(item.name)}>
                                {item.name}
                            </Dropdown.Item>
                        )
                    )
                }
            </Dropdown.Menu>
        </Dropdown>
        <Input color="primary" disableUnderline={true} className="input" type="text" placeholder={` ${searchByValue}`} />
        
    </div>);
}

export default SearchBox