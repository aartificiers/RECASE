import React from 'react';
import "./navbar.scss";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const userInfo=useSelector(state=>state.user);
  return (
    <div className='navbar glass'>
        <div className="navbar-wrap ">
            <div className="nav-left">
                <h1>srboss.com</h1>
            </div>
            <div className="nav-right">
                <h3>विश्व की पहली भरोसेमन्द वेबसाइट</h3>
                {userInfo.isAuthenticated && <Link className='adminDashbtn' to={"/admin/dashboard/dash"}>Dashboard</Link>}
                
            </div>
        </div>
    </div>
  )
}

export default Navbar;