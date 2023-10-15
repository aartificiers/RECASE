import React from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { BsDice6 } from 'react-icons/bs';
import "./Header.scss";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { IoGameController } from 'react-icons/io5';

const DashHeader = (props) => {
    const user=useSelector(state=>state.user);
    return (
        <div className="admin-header">
            <div className="headerWrap">
                <div className="title">{props.title}</div>
                <div className="searchbar">
                    <input type="text" />
                    <button><FaSearch/></button>
                </div>
                <div className="nav-btn"><button><BsDice6/></button></div>
                <div className="bottom-navigation">
                    <div className="bot-nav-links">
                        {user.user.role==="BENJO" && <div className="link"><Link to={'/admin/dashboard/dash'} ><BiSolidDashboard/></Link></div>}
                        {user.user.role === "BENJO" && <div className="link"><Link to={'/admin/dashboard/subuser'} ><FaUser/></Link></div>}
                        <div className="link"><Link to={'/admin/dashboard/games'} ><IoGameController/></Link></div>
                    </div>

                </div>
            </div>
        </div>
      )
}

export default DashHeader