import React from 'react';
import "./chartlist.scss";


const ChartList = (props) => {
    return (
        <div className='ChartList glass brdr-rad'>
            <div className="ChartListWrap">
                <div className="listHeading">
                    <p>{props.title}</p>
                </div>
                <div className="contentList">
                    <ul className='contentWrap'>
                        {props.data?.map((itm, ind) => {

                            return (
                                <li key={ind}><a href="#">{itm.title} </a></li>
                            )
                        })}


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChartList