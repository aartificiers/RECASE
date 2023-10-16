import React, { useEffect, useState } from 'react';
import './matkatable.scss';
import { RiRefreshLine } from 'react-icons/ri';
import { fastSatkaResult } from '../../Constants/dummy';
import { API } from '../../Services/Api';
import { Link } from 'react-router-dom';

const MatkaTableSwap = ({toggle,setToggle}) => {
    const [gamesResultData,setGamesResultData]=useState([]);
    const [windowDimensions, setWindowDimensions] = useState({
        width: 1536,
        height: 0,
    });

    useEffect(() => {
        fetchGameResults();
        function updateWindowDimensions() {
            setWindowDimensions({
                width: typeof window !== 'undefined' ? window.innerWidth : 0,
                height: typeof window !== 'undefined' ? window.innerHeight : 0,
            });
        }

        if (typeof window !== 'undefined') {
            updateWindowDimensions();
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', updateWindowDimensions);
        }
        // Clean up the event listener when the component unmounts
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', updateWindowDimensions);
            }
        };

    }, []);

    const fetchGameResults = async () => {
        const response = await API.getAllGamesWithoutLimit();
        if (response.isSuccess) {
            console.log("response",response);
           setGamesResultData(response.data.data);
        }
     }
    return (
        <div className='matkaTableSwap'>
            <div className="matkaswapwrap">

                {windowDimensions.width <= 991 ? (
                    <div className='matkalist'>
                        <div className="matkalistwrap">
                            <ul>
                                {gamesResultData?.map((item, index) => {
                                    return (
                                        <li key={index} className={item.hilite ? 'livelistrow hilite' : 'livelistrow'}>
                                            <div className='liveTop'>
                                                {item.extra?.length > 0 ? item.extra.map((extra, ind) => {
                                                    return (
                                                        <p key={ind}>{extra}</p>
                                                    )
                                                }) : null}

                                            </div>

                                            <div className="liveMid">
                                                <h1> {item.gamename.toUpperCase()}</h1>
                                                <h3> {item.result.toUpperCase()}</h3>

                                            </div>

                                            <div className="liveBottom">
                                                <div className='list-btns'><Link to={'/home/jodi/'+item.jodi_id}>JODI</Link></div>
                                                <div className="time"> {item.time.toUpperCase()} </div>
                                                <div className='list-btns'><Link to={'/home/panel/'+item.panel_id}>PANEL</Link></div>
                                            </div>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>

                    </div>
                ) :
                    (

                        <div className={"matkaResultTable"}>
                            <div className={"matkaResultTableWrap"}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>NAME</th>
                                            <th></th>
                                            <th>RESULT</th>
                                            <th></th>
                                            <th>TIMING</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {gamesResultData?.map((item, index) => {

                                            return (
                                                <tr key={index} className={item.hilite ? 'livembl hilite' : 'livembl'}>
                                                    <td>
                                                        {item.extra?.length > 0 ? item.extra.map((extra, ind) => {
                                                            return (
                                                                <p key={ind}>{extra}</p>
                                                            )
                                                        }) : null}
                                                        {item.gamename}
                                                    </td>
                                                    <td><Link to={'/home/jodi/'+item.jodi_id}>JODI</Link></td>
                                                    <td>{item.result}</td>
                                                    <td><Link to={'/home/panel/'+item.panel_id}>PANEL</Link></td>
                                                    <td>{item.time}</td>
                                                </tr>
                                            )
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

            </div>
        </div>
    )
}

export default MatkaTableSwap;