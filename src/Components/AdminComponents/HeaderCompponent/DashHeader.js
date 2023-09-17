import React from 'react';
import { FaSearch } from 'react-icons/fa';
import "./Header.scss";

const DashHeader = (props) => {
    return (
        <div className="admin-header">
            <div className="headerWrap">
                <div className="title">{props.title}</div>
                <div className="searchbar">
                    <input type="text" />
                    <button><FaSearch/></button>
                </div>
            </div>
        </div>
      )
}

export default DashHeader