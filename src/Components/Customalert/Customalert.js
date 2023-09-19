import React from 'react';
import './customalert.scss';
import { FaTimes } from 'react-icons/fa';
import { PiSealCheckLight, PiSealDuotone, PiSealWarningLight } from 'react-icons/pi';

const Customalert = ({ data, handleClose, type = "success" }) => {
    return (
        <div className={"custom-alert"}>
            <div className={"alrt-wrap glass brdr-rad " + type}>
                <div className="alrt-head">
                    <h3> {type==='success' ? <PiSealCheckLight style={{fontSize:"1.5em"}} /> : type==='error' ? <PiSealDuotone style={{fontSize:"1.5em"}} /> : type==='warn' ? <PiSealWarningLight style={{fontSize:"1.5em"}} />  :null}  {data.title}</h3>
                    <button onClick={() => handleClose()} ><FaTimes /></button>
                </div>
                <div className="alrt-body">
                    <p>{data.message}</p>
                </div>
                <div className="alrt-foot">
                    <button onClick={() => handleClose()} >Close</button>
                </div>
            </div>
        </div>
    )
}

export default Customalert