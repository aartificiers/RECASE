import React, { useEffect, useState } from 'react';
import "./tablelistswap.scss";
import { RiRefreshLine } from "react-icons/ri";
import { liveUpdate } from '../../Constants/dummy';

const TableListSwap = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width:  0,
        height:  0,
    });

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

    return (

        <div className='TableListSwap'>
            <div className="TableListSwapWrap">
                {windowDimensions.width <= 991 ? (
                    <div className='liveList'>
                        <div className="liveListWrap">
                            <ul>
                                {liveUpdate.map((item, index) => {
                                    return (
                                        <li key={index}>
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
                                                <div className='list-btns'><button><RiRefreshLine /></button></div>
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
                                        {liveUpdate.map((item, index) => {
                                            return (
                                                <tr key={index}>
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
                                                    <td className='table-btns'><button>Refresh</button></td>
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