import React, { useEffect, useState } from 'react';
import './jodi.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { API } from '../../../../Services/Api';
import { convertDate, sortArrayByDate } from '../../../../Utils/commonutil';
import { toast } from 'react-toastify';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import Spinner from '../../../../Components/Spinner/Spinner';

const initialUpdateJodiData = {
    monday: {
        hilite: false,
        value: "85"
    },
    tueday: {
        hilite: false,
        value: "45"
    },
    wedday: {
        hilite: false,
        value: "15"
    },
    thuday: {
        hilite: false,
        value: "85"
    },
    friday: {
        hilite: false,
        value: "85"
    },
    satday: {
        hilite: false,
        value: "85"
    },
    sunday: {
        hilite: false,
        value: "85"
    }
}
const initialCreateData = {
    monday: {
        hilite: false,
        value: ""
    },
    tueday: {
        hilite: false,
        value: ""
    },
    wedday: {
        hilite: false,
        value: ""
    },
    thuday: {
        hilite: false,
        value: ""
    },
    friday: {
        hilite: false,
        value: ""
    },
    satday: {
        hilite: false,
        value: ""
    },
    sunday: {
        hilite: false,
        value: ""
    }
}

const Jodi = ({ jodi_id }) => {
    const [openModal, setOpenModal] = useState(false);
    const [jodiData, setJodiData] = useState([]);
    const [jodiUpdateData, setJodiUpdateData] = useState(initialUpdateJodiData);
    const [jodiFormData, setJodiFormData] = useState(initialCreateData);
    const [loading,setLoading]=useState(false);
    const [editId, setEditId] = useState(null);


    useEffect(() => {
        fetchJodi();
    }, [])

    const fetchJodi = async () => {
        const resp = await API.getJodiById({ id: jodi_id });
        if (resp.isSuccess) {
            setJodiData(resp.data[0]);
        } else {
            console.log(resp);
        }
    }

    const handleUpdateInputChange = (e) => {
        const { name, value } = e.target;
        setJodiUpdateData(preval => {
            return {
                ...preval,
                [name]: {
                    ...preval[name],
                    value: value
                }
            }
        })
    }

    const handleCreateInputChaange = (e) => {
        const { name, value } = e.target;
        setJodiFormData(preval => {
            return {
                ...preval,
                [name]: {
                    ...preval[name],
                    value: value
                }
            }
        })
    }

    const handleUpdateHiliteChange = (e) => {
        const { name, checked } = e.target;

        setJodiUpdateData(preval => {
            return {
                ...preval,
                [name]: {
                    ...preval[name],
                    hilite: checked
                }
            }
        })

    }
    const handleCreateHiliteChange = (e) => {
        const { name, checked } = e.target;

        setJodiFormData(preval => {
            return {
                ...preval,
                [name]: {
                    ...preval[name],
                    hilite: checked
                }
            }
        })

    }

    const handleCreateJodi=async()=>{
        const resp=await API.createJodi({jodiId:jodi_id, newData:jodiFormData});
        setLoading(true);
        if(resp.isSuccess){
            toast.success("Jodi Created Successfully !!");
            setJodiFormData(initialCreateData);
            setOpenModal(false);
            setLoading(false);
            fetchJodi();
        }else{
            toast.error("Jodi Creation Failed");
            setLoading(false);
        }

    }

    const handleDeleteJodi = async (id) => {
        if (window.confirm("Do You Really Want To Delete This Jodi") === true) {
          const response = await API.deleteJodi({ jodiId:jodi_id, dataId:id });
          if (response.isSuccess) {
            toast.success("Jodi Deleted Successfuly");
            fetchJodi();
          }else{
            toast.error("Jodi Deletion Failed");
          }
        }
      }

    const handleUpdateJodi = async (dataId) => {
        // console.log(dataId);
        const response = await API.updateJodi({ jodiId: jodi_id, dataId: dataId, newData: jodiUpdateData });

        if (response.isSuccess) {
            setJodiUpdateData(initialUpdateJodiData);
            setEditId(null);
            fetchJodi();
            toast.success("1 Row Updated");
        }
    }

    return (
        <div className="adminjodi">
            <div className="adminjodiWrap">
                <DashHeader title={"Jodi Details"} />
                <div className="filter">
                    <h1>{jodiData.title}</h1>
                    <button className="addBtn" onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
                </div>
                <div className="tableWrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Created At</th>
                                <th>Monday</th>
                                <th>Tueday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Sunday</th>
                                <th>More Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortArrayByDate(jodiData.data)?.map((pannel, index) => {
                                if (editId === index) {
                                    return (
                                        <tr key={index}>
                                            <td>{convertDate(pannel.createdAt)}</td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='monday' onChange={handleUpdateInputChange} value={jodiUpdateData.monday.value} />
                                                    <input type="checkbox" name='monday' checked={jodiUpdateData.monday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='tueday' onChange={handleUpdateInputChange} value={jodiUpdateData.tueday.value} />
                                                    <input type="checkbox" name='tueday' checked={jodiUpdateData.tueday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='wedday' onChange={handleUpdateInputChange} value={jodiUpdateData.wedday.value} />
                                                    <input type="checkbox" name='wedday' checked={jodiUpdateData.wedday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='thuday' onChange={handleUpdateInputChange} value={jodiUpdateData.thuday.value} />
                                                    <input type="checkbox" name='thuday' checked={jodiUpdateData.thuday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='friday' onChange={handleUpdateInputChange} value={jodiUpdateData.friday.value} />
                                                    <input type="checkbox" name='friday' checked={jodiUpdateData.friday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='satday' onChange={handleUpdateInputChange} value={jodiUpdateData.satday.value} />
                                                    <input type="checkbox" name='satday' checked={jodiUpdateData.satday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" name='sunday' onChange={handleUpdateInputChange} value={jodiUpdateData.sunday.value} />
                                                    <input type="checkbox" name='sunday' checked={jodiUpdateData.sunday.hilite} onChange={handleUpdateHiliteChange} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="btnWrap">
                                                    <button className='actn-btn' onClick={() => handleUpdateJodi(pannel._id)}><FaSave /></button>
                                                    <button className='actn-btn' onClick={() => { setEditId(null); setJodiUpdateData(initialUpdateJodiData) }}><ImCancelCircle /></button>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                else {

                                    return (
                                        <tr key={index}>
                                            <td>{convertDate(pannel.createdAt)}</td>
                                            <td className="week">
                                                <div className={ pannel.monday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.monday.value ? pannel.monday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className={ pannel.tueday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.tueday.value ? pannel.tueday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className={ pannel.wedday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.wedday.value ? pannel.wedday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className={ pannel.thuday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.thuday.value ? pannel.thuday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className={ pannel.friday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.friday.value ? pannel.friday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className={ pannel.satday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.satday.value ? pannel.satday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className={ pannel.sunday.hilite ? "weekWrap hilite" : "weekWrap"}>
                                                    {pannel.sunday.value ? pannel.sunday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="btnWrap">
                                                    <button className='actn-btn' onClick={() => { setJodiUpdateData(pannel); setEditId(index) }}><FaEdit /></button>
                                                    <button className='actn-btn' onClick={()=>handleDeleteJodi(pannel._id)} ><FaTrash /></button>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            })}
                        </tbody>
                    </table>
                </div>
                <Modal title={"Add Jodi"} openModal={openModal} setOpenModal={setOpenModal}>
                    <div className="formWrap">
                        <div className="form-grid">
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.monday.value} onChange={handleCreateInputChaange} placeholder='Monday' name='monday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='monday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.tueday.value} onChange={handleCreateInputChaange} placeholder='Tuesday' name='tueday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='tueday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.wedday.value} onChange={handleCreateInputChaange} placeholder='Wednesday' name='wedday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='wedday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.thuday.value} onChange={handleCreateInputChaange} placeholder='Thursday' name='thuday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='thuday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.friday.value} onChange={handleCreateInputChaange} placeholder='Friday' name='friday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='friday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.satday.value} onChange={handleCreateInputChaange} placeholder='Saturday' name='satday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='satday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={jodiFormData.sunday.value} onChange={handleCreateInputChaange} placeholder='Sunday' name='sunday' />
                                <div className="hilit-box">
                                    <label htmlFor="">Highlight</label>
                                    <input type="checkbox" name='sunday' onChange={handleCreateHiliteChange} />
                                </div>
                            </div>
                            <div className="form-item">
                                {loading ? <Spinner/> : <button onClick={handleCreateJodi} >Submit</button>}
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Jodi;