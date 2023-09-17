import React, { Children, useState } from 'react';
import "./modal.scss";
import { ImCross } from "react-icons/im";

const Modal = (props) => {

    return (
        <div className={props.openModal ? "modal open" : "modal"}>
            <div className="modalWrap">
                <div className="cross">
                    <h1>{props.title}</h1>
                     <button onClick={()=>props.setOpenModal(false)}><ImCross /></button></div>
                <div className="modalbody">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Modal