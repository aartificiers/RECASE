import React, { useEffect, useState } from 'react';
import './dash.scss';
import { API } from '../../../../Services/Api';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { FaEdit, FaSave } from 'react-icons/fa';
import QuillEditor from '../../../../Components/List/Quill/QuillEditor';
import { addsData } from '../../../../Constants/dummy';

const Dash = () => {
    const [luckyNum, setLuckyNum] = useState({ shubhank: "", finalank: [] });
    const [luckynumedit, setLuckyNumedit] = useState(false);

    useEffect(() => {

        const fetchLuckyNum = async () => {

            const res = await API.getluckyNum({ id: "6504c1e8c0972c9a038dd5a2" });

            if (res.isSuccess) {
                setLuckyNum(res.data);
            } else {
                console.log("error fetching");
            }
        }

        fetchLuckyNum();

    }, []);

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
                        {addsData.map((item, index) => {

                            return (
                                <div key={index} className="adds">
                                    <h1>Ad {index + 1}</h1>
                                    <QuillEditor value={item.contents} /></div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Dash