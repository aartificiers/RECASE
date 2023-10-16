import React, { useEffect, useState } from 'react';
import "./tablelistswap.scss";
import { RiRefreshLine } from "react-icons/ri";
import { liveUpdate } from '../../Constants/dummy';
import { API } from '../../Services/Api';

const TableListSwap = ({toggle,setToggle}) => {
    const [windowDimensions, setWindowDimensions] = useState({
        width:  0,
        height:  0,
    });
    const [liveGames,setLiveGames]=useState([]);

    useEffect(()=>{
        fetchLiveGames();
    },[]);

    useEffect(() => {
        
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

    const fetchLiveGames=async()=>{
        const resp=await API.getAllGamesWithLive();
        if (resp.isSuccess) {
           setLiveGames(resp.data.data);
        } 
     }

    return (

        <div className='TableListSwap'>
            <div className="TableListSwapWrap">
                {windowDimensions.width <= 991 ? (
                    <div className='liveList'>
                        <div className="liveListWrap">
                            <ul>
                                {liveGames?.map((item, index) => {
                                    return (
                                        <li key={index} className={ item.hilite ? 'livelistrow hilite' : 'livelistrow'} >
                                            <div className='liveTop'>
                                                {item.extra?.length > 0 ? item.extra.map((extra, ind) => {
                                                    return (
                                                        <p key={ind}>{extra}</p>
                                                    )
                                                }) : null}

                                            </div>

                                            <div className="liveMid">
                                                <h1> {item.gamename}</h1>
                                                <h3> {item.result}</h3>

                                            </div>

                                            <div className="liveBottom">
                                                <div className='list-btns'><button onClick={()=>setToggle(!toggle)} ><RiRefreshLine /></button></div>
                                                <div className="time"> {item.time} </div>
                                            </div>
                                        </li>
                                    )
                                })}

                            </ul>
                        </div>

                    </div>
                ) :
                    (

                        <div className="liveTable">
                            <div className="liveTableWrap">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Time</th>
                                            <th>Result</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {liveGames?.map((item, index) => {
                                            return (
                                                <tr key={index} className={item.hilite ? 'livembl hilite' : 'livembl'} >
                                                    <td>
                                                        {item.extra?.length > 0 ? item.extra.map((extra, ind) => {
                                                            return (
                                                                <p key={ind}>{extra}</p>
                                                            )
                                                        }) : null}
                                                        {item.gamename}
                                                    </td>
                                                    <td>{item.time}</td>
                                                    <td>{item.result}</td>
                                                    <td className='table-btns' onClick={()=>setToggle(!toggle)} ><button>Refresh</button></td>
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

export default TableListSwap