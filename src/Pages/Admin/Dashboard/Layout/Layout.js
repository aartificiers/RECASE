import React, { useState } from 'react';
import './layout.scss';
import { PiDotsSixVerticalBold } from 'react-icons/pi';
import { BiSolidDashboard } from 'react-icons/bi';
import { IoGameController } from 'react-icons/io5';
import { VscLayoutPanelCenter } from 'react-icons/vsc';
import { IoMdExit } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { BsFillPauseFill } from 'react-icons/bs';
import { logoutUser } from '../../../../Utils/commonutil';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../../../Store/Slices/userSlice';
import { toast } from 'react-toastify';
import Dash from '../Dash/Dash';
import Panel from '../Panel/Panel';
import Games from '../Games/Games';
import Jodi from '../Jodi/Jodi';
import Subuser from '../Subuser/Subuser';
import Denied from '../Denied/Denied';


const Layout = () => {
  const userInfo=useSelector(state=>state.user);
    let [sideBarToggle, setSideBarToggle] = useState(false);
    const navigate=useNavigate();
    const dispatch= useDispatch();
    const {page,id} = useParams();



    const logout=()=>{
      if(logoutUser()){
        dispatch(addUser({isAuthenticated:false,user:{}}));
        navigate("/admin/login");
      }else{
        toast.error("Logout Failed");
      }
    }
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
              </li>

              <li>
                <div title="Logout" className="menu-list"><button className='logBtn'><IoMdExit /></button></div>
              </li>
            </ul>
          ) : (
            <ul className="listItems">
              <li>
                <div title="SR Boss" className='logo'><Link to={"/home"}>SR Dash</Link></div>
                <div className="user"><Link to={"#"}><img src={userInfo.user.profilepic} alt='avatar' width={100} height={100} />{userInfo.user.name}</Link></div>
                {userInfo.user.role=="BENJO" && <div className="menu-list"><Link to={"/admin/dashboard/dash"}><BiSolidDashboard />Dashboard</Link></div>}
                {userInfo.user.role==="BENJO" && <div className="menu-list"><Link to={"/admin/dashboard/subuser"}><FaUser />Sub User</Link></div>}
                <div className="menu-list"><Link to={"/admin/dashboard/games"}><IoGameController />Games</Link></div>
              </li>
              <li>
                <div className="menu-list"><button onClick={logout} className='logBtn'><IoMdExit />Logout</button></div>
              </li>
            </ul>
          )}

        </div>
        <div className="rightSide">
          {
            page === 'dash' && userInfo.user.role === "BENJO" ?<Dash/>:
            page === 'panel' && (id!=null || id!=undefined || id!="")?<Panel panel_id={id} />:
            page === 'games'?<Games/>:
            page === 'jodi' && (id!=null || id!=undefined || id!="")?<Jodi jodi_id={id} />:
            page === 'subuser' && userInfo.user.role === "BENJO" ?<Subuser/>:<Denied/>
          }
        </div>
      </div>
    </div>
  )
}

export default Layout