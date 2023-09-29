import React, { useEffect, useState } from 'react';
import './dash.scss';
import { API } from '../../../../Services/Api';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { FaDiceFive, FaEdit, FaSave } from 'react-icons/fa';
import QuillEditor from '../../../../Components/List/Quill/QuillEditor';
import { addsData, netWeeklyData, weeknumtableData } from '../../../../Constants/dummy';
import { GiRollingDices } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Spinner from '../../../../Components/Spinner/Spinner';


const Dash = () => {
    // Data Setting Variables
    // ===========================
    const [luckyNum, setLuckyNum] = useState({ shubhank: "", finalank: [] });
    const [ads, setAds] = useState([]);
    const [netWeekly, setNetWeekly] = useState([]);
    const [dayNight, setDayNight] = useState([1, 2, 3, 4]);
    const [guessingTableData, setGuessingTableData] = useState([]);

    // Update Data Variables 
    // ===========================
    const [adsUpdateData, setUpdateAds] = useState({ adContent: "" });
    const [guessUpdateData, setGuessUpdateData] = useState({
        week: "",
        _id: '',
        values: [{
            guessing: '',
            patti: '',
            jodi: '',

        },
        {
            guessing: '',
            patti: '',
            jodi: '',

        },
        {
            guessing: '',
            patti: '',
            jodi: '',

        },
        {
            guessing: '',
            patti: '',
            jodi: '',

        },]
    })

    // Editing Id Variables
    // ===========================
    const [luckynumedit, setLuckyNumedit] = useState(false);
    const [adEdit, setAdEdit] = useState(null);
    const [netEdit, setNetEdit] = useState(null);
    const [dnGuessingEdit, setDnGuessingEdit] = useState(null);
    const [guessingTableEdit, setGuessingTableEdit] = useState(null);

    // Common Variables
    // ===========================
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        fetchLuckyNum();
        fetchAds();
        fetchGuessingTableData();
    }, []);


    // Fetching Functions
    // =============================

    const fetchLuckyNum = async () => {
        const res = await API.getluckyNum({ id: "6504c1e8c0972c9a038dd5a2" });
        if (res.isSuccess) {
            setLuckyNum(res.data);
        } else {
            console.log("error fetching");
        }
    }
    const fetchAds = async () => {
        const res = await API.getAds();
        if (res.isSuccess) {
            setAds(res.data.data);
        } else {
            console.log("error fetching");
        }
    }
    const fetchGuessingTableData = async () => {
        const res = await API.getGuessings();
        if (res.isSuccess) {
            setGuessingTableData(res.data.data);
        } else {
            console.log("error fetching");
        }
    }


    // Handle Input Change Functions
    // ******************************

    const handleLuckyChange = (e) => {
        const { name, value } = e.target;

        if (name === "finalank") {
            setLuckyNum((preval) => {
                return {
                    ...preval,
                    [name]: value.split(",")
                }
            })
        } else {
            setLuckyNum((preval) => {
                return {
                    ...preval,
                    [name]: value
                }
            })
        }

    }
    const handleQuilChange = (adContent) => {

        setUpdateAds({ adContent });
        console.log(adContent);
    }
    const handleGuessChange = (event, index) => {
        const { name, value } = event.target;
        const updatedData = { ...guessUpdateData };
        updatedData.values[index][name] = value && !isNaN(value) ? parseInt(value) : '';
        setGuessUpdateData(updatedData);
    }




    // Updations Functions
    // ############################
    const handleLuckySave = async (id) => {

        const resp = await API.updateluckynum({ id: "6504c1e8c0972c9a038dd5a2", updateData: luckyNum });

        if (resp.isSuccess) {
            console.log("Updation Successfull");
            setLuckyNumedit(false);
        } else {
            console.log("updation failed");
        }

    }
    const handleAdSave = async (id, updateData) => {

        const resp = await API.editAds({ id, updateData });

        if (resp.isSuccess) {
            toast.success("Ad Updated Successfully");
            setAdEdit(null);
            fetchAds();
        } else {
            toast.error("Ad Updation Failed");
        }
    }
    const handleGuessingSave = async (id) => {
        setFetching(true);

        const resp = await API.updateGuessings({ id: id, updateData: guessUpdateData });

        if (resp.isSuccess) {
            setGuessingTableEdit(null);
            toast.success("1 Row Updated Successfully");
            fetchGuessingTableData();
            setFetching(false);
        } else {
            toast.error("Error In Updation");
            setGuessingTableEdit(null);
            setFetching(false);
        }

    }


    return (
        <div className="stats">
            <div className="statsWrap">
                <DashHeader title={"Dashboard"} />

                <div className="luckynumbers">
                    <div className="shubhank">
                        <h1>Shubhank</h1>
                        {luckynumedit ? <input type="text" value={luckyNum.shubhank} name='shubhank' onChange={handleLuckyChange} /> : <h3>{luckyNum?.shubhank}</h3>}

                    </div>

                    <div className="finalank">
                        <h1>Final Ank</h1>
                        {luckynumedit ? <input type="text" value={luckyNum.finalank.join(",")} name='finalank' onChange={handleLuckyChange} /> : luckyNum.finalank?.length > 0 ? luckyNum.finalank.join(',') : null}
                    </div>
                    <div className="btns">
                        {luckynumedit ? <button className='btn btn__primary' onClick={() => handleLuckySave(luckyNum._id)}><FaSave /></button> : <button className='btn btn__primary' onClick={() => setLuckyNumedit(true)} ><FaEdit /></button>}


                    </div>
                </div>

                <div className='adds-edit'>
                    <h1 className='sec-title'>Ads</h1>
                    <div className="adds-grid">
                        {ads.length > 0 ? ads.map((item, index) => {
                            return (
                                <div key={index} className="adds-view">
                                    <div className='ads-heads'>
                                        <h1>Ad {index + 1} </h1>
                                        {adEdit !== index ? <button onClick={() => { setAdEdit(index); setUpdateAds({ adContent: item.adContent }) }}> <FaEdit /> </button> : <button onClick={() => handleAdSave(item._id, adsUpdateData)}> <FaSave /> </button>}
                                    </div>
                                    {adEdit === index ? <QuillEditor onChange={handleQuilChange} value={item.adContent} /> : <div dangerouslySetInnerHTML={{ __html: item.adContent }}></div>}
                                </div>
                            )
                        }) : null}
                    </div>
                </div>

                <div className="netweekly-edit">
                    <h1 className="sec-title">Net Weekly</h1>
                    <div className="net-week-wrap">
                        {netWeeklyData.map((item, indx) => {
                            return (
                                <div className="net-card" key={indx}>
                                    <div className="net-title">{netEdit == indx ? <input style={{ width: "100%", height: "35px", fontSize: "1.2em" }} type="text" value={"hello"} /> : "hello"}</div>
                                    {netEdit === indx ? <QuillEditor value={"duibucucdh"} onChange={() => console.log("dftydc")} /> : <div className="netcontent" dangerouslySetInnerHTML={{ __html: "<p>Hello</p>" }}></div>}
                                    <div className="btns-cont">
                                        {netEdit === indx ? <button className='btn btn__primary' onClick={() => setNetEdit(null)} ><FaSave /></button> : <button className='btn btn__primary' onClick={() => setNetEdit(indx)} ><FaEdit /></button>}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="daynight-guessing">
                    <h1 className="sec-title">Day Night Guessing</h1>
                    <div className="dynt-grid">
                        {dayNight.length > 0 ? dayNight.map((item, index) => {
                            return (
                                <div className="dynt-item">
                                    <div className="ttl">Milan MOrning</div>
                                    {dnGuessingEdit === index ? <QuillEditor /> : <div className="guess-cont" >dgsgdssdsdsdsdgsd vsdgsdgsd bsgsd sdgsdgs fbsff df df d df df df df </div>}
                                    <div className="btn-cont ">
                                        {dnGuessingEdit === index ? <button className='btn btn__primary' onClick={() => setDnGuessingEdit(null)} ><FaSave /></button> : <button className='btn btn__primary' onClick={() => setDnGuessingEdit(index)}><FaEdit /></button>}

                                    </div>
                                </div>
                            )

                        }) : null}
                    </div>
                </div>


                <div className="weeknumtable-view">
                    <div className="weeknumview-wrap">
                        <h1 className="sec-title">Guessing Patti Table</h1>
                        {guessingTableData?.map((weeknum, index) => {
                            return (
                                <div key={index} className="weeknum-tbl">
                                    <h1>{weeknum.title}</h1>
                                    <div className="tbl-wrap">
                                        <table>
                                            <thead></thead>
                                            <tbody>
                                                {
                                                    weeknum.content.map((contitem, indx) => {
                                                        return (
                                                            <tr key={indx}>
                                                                <td>{contitem.week}</td>
                                                                {contitem.values.map((val, ind) => {
                                                                    return (
                                                                        <td key={ind}>
                                                                            <div className="weekNumCol">
                                                                                <div className="left">
                                                                                    {guessingTableEdit === contitem._id ? <input type='text' name='guessing' value={val.guessing} onChange={(e) => { handleGuessChange(e, ind) }}></input> : val.guessing}
                                                                                </div>
                                                                                <div className="right">
                                                                                    <div className="rightTop">
                                                                                        {guessingTableEdit === contitem._id ? <input type='text' name='patti' value={val.patti} onChange={(e) => { handleGuessChange(e, ind) }} ></input> : val.patti}
                                                                                    </div>
                                                                                    <div className="rightBottom">
                                                                                        {guessingTableEdit === contitem._id ? <input type='text' name='jodi' value={val.jodi} onChange={(e) => { handleGuessChange(e, ind) }}></input> : val.jodi}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    )
                                                                })}
                                                                <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{guessingTableEdit === contitem._id ? <button className='btn btn__primary' onClick={() => handleGuessingSave(contitem._id)}><FaSave /></button> : <button className='btn btn__primary' onClick={() => { setGuessUpdateData(contitem); setGuessingTableEdit(contitem._id) }}><FaEdit /></button>}</div></td>
                                                            </tr>
                                                        )
                                                    })

                                                }

                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>


            </div>
        </div>

    )
}

export default Dash