import React from 'react';
import "./gridresult.scss";

const GridResult = (props) => {
    return (
    <div className="gridReultItem glass brdr-rad">

        <h1>{props.title}</h1>

        <div className="content" dangerouslySetInnerHTML={{__html:props.content ? props.content:"<p>*-*-*-*</p><p>***-***-***-***-***</p><p>**-**-**-**-**-**-**-**</p>"}}/>
    </div>

    )
}

export default GridResult;