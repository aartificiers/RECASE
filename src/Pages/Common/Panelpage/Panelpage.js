import React, { useEffect, useState } from 'react';
import './panelpage.scss';
import { sortArrayByDate } from '../../../Utils/commonutil';
import { Footer } from '../../../Components/Footer/Footer';
import { useParams } from 'react-router-dom';
import { API } from '../../../Services/Api';
import Navbar from '../../../Components/Navbar/Navbar';

const Panelpage = () => {
    const [panelData, setPanelData] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchPanel();
    }, []);

    const fetchPanel = async () => {
        const resp = await API.getPanelById({ id: id });
        if (resp.isSuccess) {
            setPanelData(resp.data[0]);
        } else {
            console.log(resp);
        }
    }
    return (
        <div className="main dark">
            <div className="mainWrap">
                <Navbar/>
                <div className={"pannel"}>
                    <div className={"pannelWrap"}>
                        <div className={"pannelTable" + " glass brdr-rad"}>
                            <h1>{panelData.title && panelData.title} Pannel Chart</h1>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
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
                                    {sortArrayByDate(panelData.data)?.map((pannel, index) => {
                                        return (

                                            <tr key={index}>
                                                <td>
                                                    <div className={"dateWrap"}>
                                                        <h3>{pannel.date[0]}</h3>
                                                        <h3>To</h3>
                                                        <h3>{pannel.date[1]}</h3>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.monday.hilite ? "hilite" : null}`}>
                                                            {pannel.monday.value[0] ? pannel.monday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.monday.hilite ? "hilite" : null}`}>
                                                            {pannel.monday.value[1] ? pannel.monday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.monday.hilite ? "hilite" : null}`}>
                                                            {pannel.monday.value[2] ? pannel.monday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.tueday.hilite ? "hilite" : null}`}>
                                                            {pannel.tueday.value[0] ? pannel.tueday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.tueday.hilite ? "hilite" : null}`}>
                                                            {pannel.tueday.value[1] ? pannel.tueday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.tueday.hilite ? "hilite" : null}`}>
                                                            {pannel.tueday.value[2] ? pannel.tueday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.wedday.hilite ? "hilite" : null}`}>
                                                            {pannel.wedday.value[0] ? pannel.wedday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.wedday.hilite ? "hilite" : null}`}>
                                                            {pannel.wedday.value[1] ? pannel.wedday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.wedday.hilite ? "hilite" : null}`}>
                                                            {pannel.wedday.value[2] ? pannel.wedday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.thuday.hilite ? "hilite" : null}`}>
                                                            {pannel.thuday.value[0] ? pannel.thuday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.thuday.hilite ? "hilite" : null}`}>
                                                            {pannel.thuday.value[1] ? pannel.thuday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.thuday.hilite ? "hilite" : null}`}>
                                                            {pannel.thuday.value[2] ? pannel.thuday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.friday.hilite ? "hilite" : null}`}>
                                                            {pannel.friday.value[0] ? pannel.friday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.friday.hilite ? "hilite" : null}`}>
                                                            {pannel.friday.value[1] ? pannel.friday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.friday.hilite ? "hilite" : null}`}>
                                                            {pannel.friday.value[2] ? pannel.friday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.satday.hilite ? "hilite" : null}`}>
                                                            {pannel.satday.value[0] ? pannel.satday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.satday.hilite ? "hilite" : null}`}>
                                                            {pannel.satday.value[1] ? pannel.satday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.satday.hilite ? "hilite" : null}`}>
                                                            {pannel.satday.value[2] ? pannel.satday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>
                                                <td className={"week"}>
                                                    <div className={"weekWrap"}>
                                                        <div className={`left ${pannel.sunday.hilite ? 'hilite' : null}`}>
                                                            {pannel.sunday.value[0] ? pannel.sunday.value[0] : "***"}
                                                        </div>
                                                        <div className={`mid ${pannel.sunday.hilite ? "hilite" : null}`}>
                                                            {pannel.sunday.value[1] ? pannel.sunday.value[1] : "**"}
                                                        </div>
                                                        <div className={`right ${pannel.sunday.hilite ? 'hilite' : null}`}>
                                                            {pannel.sunday.value[2] ? pannel.sunday.value[2] : "***"}
                                                        </div>
                                                    </div>

                                                </td>


                                            </tr>
                                        )
                                    })}
                                </tbody>

                            </table>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panelpage