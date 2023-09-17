import React from 'react';
import "./navbar.scss";

const Navbar = () => {
  return (
    <div className='navbar glass'>
        <div className="navbar-wrap ">
            <div className="nav-left">
                <h1>srboss.com</h1>
            </div>
            <div className="nav-right">
                <h3>विश्व की पहली भरोसेमन्द वेबसाइट</h3>
            </div>
        </div>
    </div>
  )
}

export default Navbar;