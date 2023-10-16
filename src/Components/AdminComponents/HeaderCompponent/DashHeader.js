import React, { useState } from 'react';
import { FaHome, FaMinus, FaPlus, FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { BsDice6 } from 'react-icons/bs';
import "./Header.scss";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BiSolidDashboard } from 'react-icons/bi';
import { IoGameController } from 'react-icons/io5';
import { addUser } from '../../../Store/Slices/userSlice';
import { logoutUser } from '../../../Utils/commonutil';
import { IoMdExit } from 'react-icons/io';

const DashHeader = (props) => {
    const user = useSelector(state => state.user);
    const [openNavLinks,setOpenNavLinks]=useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        if (logoutUser()) {
            dispatch(addUser({ isAuthenticated: false, user: {} }));
            navigate("/admin/login");
        } else {
            toast.error("Logout Failed");
        }
    }
    return (
        <div className="admin-header">
            <div className="headerWrap">
                <div className="title">{props.title}</div>
                <div className="searchbar">
                    <input type="text" />
                    <button><FaSearch /></button>
                </div>
                <div className="nav-btn"><button><BsDice6 /></button></div>
                <div className="bottom-navigation">
                    <div className="bot-nav-links">
                        <div className={openNavLinks ? "collapsible active" : "collapsible"}>
                            {user.user.role === "BENJO" && <div className="link"><Link to={'/admin/dashboard/dash'} ><BiSolidDashboard /></Link></div>}
                            {user.user.role === "BENJO" && <div className="link"><Link to={'/admin/dashboard/subuser'} ><FaUser /></Link></div>}
                            <div className="link"><Link to={'/admin/dashboard/games'} ><IoGameController /></Link></div>
                            <div className="link"><Link to={'/'} ><FaHome /></Link></div>
                            <div className="link"><button onClick={logout} className='logBtn'><IoMdExit /></button></div>
                        </div>
                        <div className="link">{openNavLinks ? <button onClick={()=>setOpenNavLinks(false)} style={{padding:"15px"}} className='logBtn'><FaMinus/></button>: <button onClick={()=>setOpenNavLinks(true)} style={{padding:"15px"}} className='logBtn'><FaPlus/></button>}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashHeader;