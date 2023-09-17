import React, { useState } from 'react';
import './layout.scss';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BiSolidDashboard } from 'react-icons/bi';
import { IoGameController } from 'react-icons/io5';
import { VscLayoutPanelCenter } from 'react-icons/vsc';
import { IoMdExit } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsFillPauseFill } from 'react-icons/bs';


const Layout = () => {
    let [sideBarToggle, setSideBarToggle] = useState(false);
  return (
    <div className="dashboard">
      <div className="dashWrap">
        <div className={sideBarToggle ? "leftSide collapsed" : "leftSide"}>
          <div className="collapseBtn">
            <button onClick={() => setSideBarToggle(!sideBarToggle)}><PiDotsSixVerticalBold /></button>
          </div>
          {sideBarToggle ? (
            <ul className="collapsedMenu">
              <li>

                <div title="SR Boss" className='logo'><Link to={"/home"}>SR Dash</Link></div>
                <div title="User" className="menu-list"><Link to={"#"}><div className='avatar'></div></Link></div>
                <div title="Dashboard" className="menu-list"><Link to={"/"}><BiSolidDashboard /></Link></div>
                <div title="View Clients" className="menu-list"><Link to={"/admin/dashboard/subuser"}><FaUser /></Link></div>
                <div title="Games" className="menu-list"><Link to={"/admin/dashboard/games"}><IoGameController /></Link></div>
                <div title="Jodi" className="menu-list"><Link to={"/admin/dashboard/jodi"}><BsFillPauseFill /></Link></div>
                <div title="Panel" className="menu-list"><Link to={"/admin/dashboard/panel"}><VscLayoutPanelCenter /></Link></div>
              </li>
              <li>
                <div title="Logout" className="menu-list"><button className='logBtn'><IoMdExit /></button></div>
              </li>
            </ul>
          ) : (
            <ul className="listItems">
              <li>
                <div title="SR Boss" className='logo'><Link to={"/home"}>SR Dash</Link></div>
                <div className="user"><Link to={"#"}><div className='avatar'></div>Username</Link></div>
                <div className="menu-list"><Link to={"/"}><BiSolidDashboard />Dashboard</Link></div>
                <div className="menu-list"><Link to={"/admin/dashboard/subuser"}><FaUser />Sub User</Link></div>
                <div className="menu-list"><Link to={"/admin/dashboard/games"}><IoGameController />Games</Link></div>
                <div className="menu-list"><Link to={"/admin/dashboard/jodi"}><BsFillPauseFill />Jodi</Link></div>
                <div className="menu-list"><Link to={"/admin/dashboard/panel"}><VscLayoutPanelCenter />Panel</Link></div>
              </li>
              <li>
                <div className="menu-list"><button className='logBtn'><IoMdExit />Logout</button></div>
              </li>
            </ul>
          )}

        </div>
        <div className="rightSide">{'children'}</div>
      </div>
    </div>
  )
}

export default Layout