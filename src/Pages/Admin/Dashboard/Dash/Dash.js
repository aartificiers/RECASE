import React, { useEffect, useState } from 'react';
import './dash.scss';
import { API } from '../../../../Services/Api';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { FaEdit, FaSave } from 'react-icons/fa';
import QuillEditor from '../../../../Components/List/Quill/QuillEditor';
import { addsData } from '../../../../Constants/dummy';

const Dash = () => {
    const [luckyNum, setLuckyNum] = useState({ shubhank: "", finalank: [] });
    const [ads, setAds] = useState([]);
    const [adsUpdateData, setUpdateAds] = useState({adContent: ""});
    const [luckynumedit, setLuckyNumedit] = useState(false);
    const [adEdit, setAdEdit] = useState(false);
  
    useEffect(() => {
        fetchLuckyNum();
        fetchAds();
    }, []);
     
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
    const handleLuckySave = async (id) => {

        const resp = await API.updateluckynum({ id: "6504c1e8c0972c9a038dd5a2", updateData: luckyNum });

        if (resp.isSuccess) {
            console.log("Updation Successfull");
            setLuckyNumedit(false);
        } else {
            console.log("updation failed");
        }

    }

    const handleAdSave = async (id,updateData) => {

        const resp = await API.editAds({ id, updateData });

        if (resp.isSuccess) {
            console.log("Updation Successfull");
            setAdEdit(null);
            fetchAds();
        } else {
            console.log("updation failed");
        }
    }
     const handleQuilChange = (adContent) =>{

        setUpdateAds({adContent});
        console.log(adContent);
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
                        {luckynumedit ? <button onClick={() => handleLuckySave(luckyNum._id)}><FaSave /></button> : <button onClick={() => setLuckyNumedit(true)} ><FaEdit /></button>}


                    </div>
                </div>
                <div className='adds-edit'>
                    <div className="adds-grid">
                        {ads.length> 0 ? ads.map((item, index) => {
                            return (
                                <div key={index} className="adds">
                                    <div className='ads-heads'>
                                        <h1>Ad {index + 1} </h1>
                                      { adEdit !== index ? <button onClick={() => setAdEdit(index)}> <FaEdit /> </button> : <button onClick={() => handleAdSave(item._id , adsUpdateData)}> <FaSave /> </button> }
                                    </div>
                                    {adEdit === index ? <QuillEditor onChange={handleQuilChange} value={item.adContent} /> : <div dangerouslySetInnerHTML={{ __html: item.adContent }}></div>}
                                </div>
                            )
                        }):null}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Dash