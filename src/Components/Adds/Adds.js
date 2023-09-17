import React from 'react'
import "./adds.scss";

const Adds = (props) => {
    return (
        <div className="adds glass brdr-rad">
            <div className="addsWrap" dangerouslySetInnerHTML={{__html:props.addContent}} />
        </div>
    )
}

export default Adds;