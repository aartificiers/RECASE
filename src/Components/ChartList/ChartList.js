import React from 'react';
import "./chartlist.scss";
import { Link } from 'react-router-dom';


const ChartList = (props) => {
    console.log(props.data);
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
                                <li key={ind}><Link to={props.refer==="j" ? `/home/jodi/${itm.jodi_id}` : `/home/panel/${itm.panel_id}`}>{itm.title}</Link></li>
                            )
                        })}


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ChartList