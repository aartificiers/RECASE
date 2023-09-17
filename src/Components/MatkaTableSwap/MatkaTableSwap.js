import React, { useEffect, useState } from 'react';
import './matkatable.scss';
import { RiRefreshLine } from 'react-icons/ri';
import { fastSatkaResult } from '../../Constants/dummy';

const MatkaTableSwap = () => {
    const [windowDimensions, setWindowDimensions] = useState({
        width: 1536,
        height: 0,
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
        <div className='matkaTableSwap'>
            <div className="matkaswapwrap">

                {windowDimensions.width <= 991 ? (
                    <div className='matkalist'>
                        <div className="matkalistwrap">
                            <ul>
                                {fastSatkaResult.map((item, index) => {
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
                                                <div className='list-btns'><button>JODI</button></div>
                                                <div className="time"> {item.time} </div>
                                                <div className='list-btns'><button>PANNEL</button></div>
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

                                        {fastSatkaResult.map((item, index) => {

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
                                                    <td><button>Jodi</button></td>
                                                    <td>{item.result}</td>
                                                    <td><button>Pannel</button></td>
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