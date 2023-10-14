import React from 'react';
import './denied.scss';
import { FaArrowLeft, FaExclamationTriangle, FaInfo } from 'react-icons/fa';

const Denied = () => {
    return (
        <div className='denied'>
            <h1>Access Denied</h1>
            <br /><br />
            <h3 style={{ display: "flex", alignItems: "center" }} > <FaExclamationTriangle />  &nbsp;&nbsp;&nbsp;You Dont Have Access To This Page</h3>
            <br /><br /><br /><br /><br />
            <div className="anim-arrow">
                <div className="arr-anim">
                    <FaArrowLeft />
                </div>
                Use The Sidebar Links For Navigation
            </div>
        </div>
    )
}

export default Denied