import React, { useEffect, useState } from 'react'
import { Footer } from '../../../Components/Footer/Footer';
import './jodipage.scss';
import { API } from '../../../Services/Api';
import { sortArrayByDate } from '../../../Utils/commonutil';
import { useParams } from 'react-router-dom';
import Navbar from '../../../Components/Navbar/Navbar';

const Jodipage = () => {

    const [jodiData, setJodiData] = useState({});
    const { id } = useParams();


    useEffect(() => {
        fetchJodi();
    }, [])

    const fetchJodi = async () => {
        const resp = await API.getJodiById({ id: id });
        if (resp.isSuccess) {
            setJodiData(resp.data[0]);
        } else {
            console.log(resp);
        }
    }
    return (
        <div className="main dark">
            <div className="mainWrap">
                <Navbar />
                <div className={"jodi"}>
                    <div className={"jodiWrap"}>
                        <div className={"jodiTable" + " glass brdr-rad"}>
                            <div className={"jodiTableWrap"}>
                                <h1>{jodiData.title}</h1>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Mon</th>
                                            <th>Tue</th>
                                            <th>Wed</th>
                                            <th>Thu</th>
                                            <th>Fri</th>
                                            <th>Sat</th>
                                            <th>Sun</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortArrayByDate(jodiData.data)?.map((pannel, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.monday.hilite ? "hilite" : null}`}>
                                                            {pannel.monday.value ? pannel.monday.value : "**"}
                                                        </div>
                                                    </td>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.tueday.hilite ? "hilite" : null}`}>
                                                            {pannel.tueday.value ? pannel.tueday.value : "**"}
                                                        </div>
                                                    </td>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.wedday.hilite ? "hilite" : null}`}>
                                                            {pannel.wedday.value ? pannel.wedday.value : "**"}
                                                        </div>
                                                    </td>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.thuday.hilite ? "hilite" : null}`}>
                                                            {pannel.thuday.value ? pannel.thuday.value : "**"}
                                                        </div>
                                                    </td>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.friday.hilite ? "hilite" : null}`}>
                                                            {pannel.friday.value ? pannel.friday.value : "**"}
                                                        </div>
                                                    </td>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.satday.hilite ? "hilite" : null}`}>
                                                            {pannel.satday.value ? pannel.satday.value : "**"}
                                                        </div>
                                                    </td>
                                                    <td className={"week"}>
                                                        <div className={`weekWrap ${pannel.sunday.hilite ? "hilite" : null}`}>
                                                            {pannel.sunday.value ? pannel.sunday.value : "**"}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Jodipage;