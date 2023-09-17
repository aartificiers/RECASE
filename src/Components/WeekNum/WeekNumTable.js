import React from 'react';
import "./weeknumtable.scss";
import { FaDiceFive } from 'react-icons/fa';
import { GiRollingDices } from 'react-icons/gi';

const WeekNumTable = (props) => {
    return (
        <div className='WeekNumTable glass brdr-rad'>
            <div className="WeekNumTableWrap ">
                <div className="heading">
                    <h3>{props?.title}</h3>
                </div>
                {/* table start */}
                <table>
                    <thead></thead>
                    <tbody>
                        {props.content.map((item, index) => {
                            return (

                                <tr key={index}>
                                    <td>{item.week}</td>
                                    {item.values.map((val, ind) => {
                                        return (
                                            <td key={ind}>
                                                <div className="weekNumCol">
                                                    <div className="left">
                                                        {val.guessing}

                                                    </div>
                                                    <div className="right">
                                                        <div className="rightTop">
                                                            <FaDiceFive/>&nbsp;{val.patti}
                                                        </div>
                                                        <div className="rightBottom">
                                                            <GiRollingDices/>&nbsp;{val.jodi}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        )

                                    })}


                                </tr>

                            )
                        })}

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default WeekNumTable