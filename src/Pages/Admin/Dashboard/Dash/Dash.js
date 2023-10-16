import React, { useEffect, useState } from 'react';
import './dash.scss';
import { API } from '../../../../Services/Api';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { FaDiceFive, FaEdit, FaPlus, FaSave, FaTrash } from 'react-icons/fa';
import QuillEditor from '../../../../Components/List/Quill/QuillEditor';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../../Components/AdminComponents/modal/Modal';


const initialDaynightData = {
    title: "",
    content: ""
}

const Dash = () => {
    const userInfo = useSelector(state => state.user);
    const navigate = useNavigate();

    // Data Setting Variables
    // ===========================
    const [luckyNum, setLuckyNum] = useState({ shubhank: "", finalank: [] });
    const [ads, setAds] = useState([]);
    const [netWeekly, setNetWeekly] = useState([]);
    const [dayNight, setDayNight] = useState([]);
    const [guessingTableData, setGuessingTableData] = useState([]);
    const [openDaynightModal, setDayNightModal] = useState(false);

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
    const [netWeekUpdatetitle, setNetWeekUpdatetitle] = useState("");
    const [netWeekUpdatecontent, setNetWeekUpdatecontent] = useState("");
    const [dayNighttitle, setDayNightTitle] = useState("");
    const [dayNightContent, setDayNightContent] = useState("");
    const [createDayNightContent, setCreateDaynightContent] = useState("");
    const [createDayNightTitle, setCreateDayNightTitle] = useState("");

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
        fetchNetweek();
        fetchDayNight();
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
    const fetchNetweek = async () => {
        const res = await API.getNetweek();
        if (res.isSuccess) {
            setNetWeekly(res.data.data);
        } else {
            console.log("error fetching");
        }
    }
    const fetchDayNight = async () => {
        const res = await API.getDayNight();
        if (res.isSuccess) {
            setDayNight(res.data.data);
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
    }
    const handleGuessChange = (event, index) => {
        const { name, value } = event.target;
        const updatedData = { ...guessUpdateData };
        updatedData.values[index][name] = value && !isNaN(value) ? parseInt(value) : '';
        setGuessUpdateData(updatedData);
    }
    const handleNetWeekContentChange = (content) => {
        setNetWeekUpdatecontent(content);
    }
    const handleDayNightChange = (val) => {
        setDayNightContent(val);
    }
    const handleCreateDayNightChange = (val) => {
        setCreateDaynightContent(val);
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
    const handleNetWeekSave = async (id) => {
        const resp = await API.editNetweek({ id, updateData: { title: netWeekUpdatetitle, content: netWeekUpdatecontent } });

        if (resp.isSuccess) {
            toast.success("Net Week Updated Successfully");
            setNetEdit(null);
            fetchNetweek();
            setNetWeekUpdatecontent("");
            setNetWeekUpdatetitle("");
        } else {
            toast.error("Net Weekly Updation Failed");
        }

    }
    const handleDayNightSave = async (id) => {
        const resp = await API.editDayNight({ id, updateData: { title: dayNighttitle, content: dayNightContent } });

        if (resp.isSuccess) {
            toast.success("Day Night Updated Successfully");
            setDnGuessingEdit(null);
            fetchDayNight();
            setDayNightContent("");
            setDayNightTitle("");
        } else {
            toast.error("Day Night Updation Failed");
        }

    }



    // Create Functions

    const createDayNight = async () => {
        const response = await API.addDayNight({ title: createDayNightTitle, content: createDayNightContent });
        if (response.isSuccess) {
            toast.success("Day Night Created Successfully");
            setCreateDayNightTitle("");
            setCreateDaynightContent("");
            setDayNightModal(false);
            fetchDayNight();
        } else {
            toast.error("Day Night Creation Failed");
        }
    }

    const deleteDayNight=async(id)=>{
        if (window.confirm("Do You Really Want To Delete This Day Night") === true) {
            const response = await API.deleteDayNight({ id });
            if (response.isSuccess) {
                toast.success("Deleted Successfully");
                fetchDayNight();
            } else {
                toast.error("Deletion Failed !!");
            }
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
                        {netWeekly?.map((item, indx) => {
                            return (
                                <div className="net-card" key={indx}>
                                    <div className="net-title">{netEdit === item._id ? <input style={{ width: "100%", height: "35px", fontSize: "1.2em" }} type="text" onChange={(e) => setNetWeekUpdatetitle(e.target.value)} value={netWeekUpdatetitle} /> : item.title}</div>
                                    {netEdit === item._id ? <QuillEditor value={netWeekUpdatecontent} onChange={handleNetWeekContentChange} /> : <div className="netcontent" dangerouslySetInnerHTML={{ __html: item.content }}></div>}
                                    <div className="btns-cont">
                                        {netEdit === item._id ? <button className='btn btn__primary' onClick={() => handleNetWeekSave(item._id)} ><FaSave /></button> : <button className='btn btn__primary' onClick={() => { setNetWeekUpdatetitle(item.title); setNetWeekUpdatecontent(item.content); setNetEdit(item._id) }} ><FaEdit /></button>}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="daynight-guessing">
                    <h1 className="sec-title">Day Night Guessing <button onClick={() => setDayNightModal(true)} className='btn'><FaPlus /></button></h1>
                    <div className="dynt-grid">
                        {dayNight.length > 0 ? dayNight.map((item, index) => {
                            return (
                                <div className="dynt-item">
                                    {dnGuessingEdit === item._id ? <input value={dayNighttitle} onChange={(e) => setDayNightTitle(e.target.value)} /> : <div className="ttl">{item.title}</div>}

                                    {dnGuessingEdit === item._id ? <QuillEditor value={dayNightContent} onChange={handleDayNightChange} /> : <div className="guess-cont" dangerouslySetInnerHTML={{ __html: item.content }} />}
                                    <div className="btn-cont ">
                                        {dnGuessingEdit === item._id ? <button className='btn btn__primary' onClick={() => handleDayNightSave(item._id)} ><FaSave /></button> : <button className='btn btn__primary' onClick={() => { setDayNightTitle(item.title); setDayNightContent(item.content); setDnGuessingEdit(item._id) }}><FaEdit /></button>}
                                        <button className='btn' onClick={() =>deleteDayNight(item._id)}  ><FaTrash /></button>
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

                {openDaynightModal &&
                    <Modal title={"Add Day Night"} openModal={openDaynightModal} setOpenModal={setDayNightModal} >
                        <div className="formWrap">
                            <div className="form-grid">
                                <div className="form-item">
                                    <input type="text" className='cust-input' value={createDayNightTitle} onChange={(e) => setCreateDayNightTitle(e.target.value)} placeholder='Title' name='title' />
                                </div>
                                <div className="form-item">
                                    <QuillEditor onChange={handleCreateDayNightChange} value={createDayNightContent} />
                                </div>
                                <div className="form-item">
                                    <button className='dyntbtn' onClick={createDayNight}>Submit</button>
                                </div>
                            </div>
                        </div>

                    </Modal>
                }


            </div>
        </div>

    )
}

export default Dash