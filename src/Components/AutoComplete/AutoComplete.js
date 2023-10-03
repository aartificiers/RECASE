import React, { useState } from 'react';
import "./autocomplete.scss";
import { FaUserCheck } from "react-icons/fa";
import { API } from '../../Services/Api';

const AutoComplete = (props) => {
    const [value, setValue] = useState("");
    const [suggestion, setSuggestion] = useState([]);

    const handleSuggestionClick = (value) => {

        setValue('');
        props.onSelect(value);
        setSuggestion([]);

    }

    const handleInputChange = async (event) => {
        const inputValue = event.target.value;
        setValue(inputValue);
        if (inputValue.length > 0) {
            const Response = await API.getSubAdminsByEmail({ email: inputValue });
            setSuggestion(Response.data);
        }
        else {
            setSuggestion([]);
        }
    }

    return (
        <div className="row2">
            <div className="input-icon-wrap">
                <FaUserCheck />
                <input type="text" className='cust-input' value={value} onChange={handleInputChange} placeholder='Search Participants Email' />

            </div>
            <div className="sugg-list">
                <ul>
                    {suggestion && suggestion.length>0 ? suggestion.map((value, index) => {
                        return (
                            <li key={value.id} onClick={() => handleSuggestionClick(value)}>
                                <div className="user-name">
                                    <div className="avatar">
                                        <span>{value.fullname.split(" ")[0].split("")[0]}{value.fullname.split(" ")[1] ? value.fullname.split(" ")[1].split("")[0] :""}</span>
                                        <h1>{value.fullname}<pre>{value.email}</pre></h1>
                                    </div>

                                    

                                </div>
                            </li>
                        )
                    }) : null}
                </ul>
            </div>
        </div>
    )
}

export default AutoComplete;