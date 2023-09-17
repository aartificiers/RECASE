import React, { useEffect, useRef } from 'react';
import "./netweekly.scss";


const NetWeekly = (props) => {

  return (
    <div className="netweekly glass brdr-rad">
      <div className="netweeklyWrap">

        <div className="weeklyWrapHead">
          <div className="highLightingHeader">

            <h1>{props.title}</h1>

          </div>
        </div>
        
        <div className="content" dangerouslySetInnerHTML={{ __html: props.content ? props.content : "<p>----------</p>" }} />



      </div>
    </div>
  )
}

export default NetWeekly;