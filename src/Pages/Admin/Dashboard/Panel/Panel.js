import React, { useEffect, useState } from 'react';
import './panel.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { panneldata } from '../../../../Constants/dummy';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { BsPlusSquare } from 'react-icons/bs';
import { convertDateFormat } from '../../../../Utils/DateFormat';
import { API } from '../../../../Services/Api';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '../../../../Components/Spinner/Spinner';
import { sortArrayByDate } from '../../../../Utils/commonutil';
import { ImCancelCircle } from 'react-icons/im';

const initialUpdatePanelData = {
  date: [
    "11-12-2022", "12-12-2022"
  ],
  monday: {
    hilite: false,
    value: ["123", "45", "678"]
  },
  tueday: {
    hilite: false,
    value: ["123", "45", "678"]
  },
  wedday: {
    hilite: true,
    value: ["123", "45", "678"]
  },
  thuday: {
    hilite: false,
    value: ["123", "45", "678"]
  },
  friday: {
    hilite: false,
    value: ["123", "45", "678"]
  },
  satday: {
    hilite: false,
    value: ["123", "45", "678"]
  },
  sunday: {
    hilite: false,
    value: ["123", "45", "678"]
  }

}

const initialCreateData={
  date: [
    "", ""
  ],
  monday: {
    hilite: false,
    value: ["", "", ""]
  },
  tueday: {
    hilite: false,
    value: ["", "", ""]
  },
  wedday: {
    hilite: false,
    value: ["", "", ""]
  },
  thuday: {
    hilite: false,
    value: ["", "", ""]
  },
  friday: {
    hilite: false,
    value: ["", "", ""]
  },
  satday: {
    hilite: false,
    value: ["", "", ""]
  },
  sunday: {
    hilite: false,
    value: ["", "", ""]
  }

}

const Panel = ({ panel_id }) => {
  const [panelId, setPanelId] = useState(null);
  const [panelData, setPanelData] = useState([]);
  const [panelUpdateData, setPanelUpdateData] = useState(initialUpdatePanelData);
  const [panelFormData, setPanelFormData] = useState(initialCreateData);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    fetchPanel();
  }, []);

  const fetchPanel = async () => {
    const resp = await API.getPanelById({ id: panel_id });
    if (resp.isSuccess) {
      console.log(resp);
      setPanelData(resp.data[0]);
    } else {
      console.log(resp);
    }
  }


  const handleUpdateInputChange = (e, ind) => {
    const { name, value } = e.target;

    setPanelUpdateData(preval => {
      return {
        ...preval,
        [name]: {
          ...preval[name],
          value: preval[name].value.map((item, i) => (i === ind ? value : item)),
        }
      }
    })


  }
  const handleCreateInputChange = (e, ind) => {
    const { name, value } = e.target;

    setPanelFormData(preval => {
      return {
        ...preval,
        [name]: {
          ...preval[name],
          value: preval[name].value.map((item, i) => (i === ind ? value : item)),
        }
      }
    })


  }
  const handleUpdateHiliteChange = (e) => {
    const { name, checked } = e.target;

    setPanelUpdateData(preval => {
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

    setPanelFormData(preval => {
      return {
        ...preval,
        [name]: {
          ...preval[name],
          hilite: checked
        }
      }
    })

  }
  const handleCreateDateChange = (e, ind) => {
    const { name, value } = e.target;

    setPanelFormData(preval => {
      return {
        ...preval,
        date: preval['date'].map((item, i) => (i === ind ? convertDateFormat(value) : item)),
      }
    })
  }
  const handleUpdateDateChange = (e, ind) => {
    const { name, value } = e.target;

    setPanelUpdateData(preval => {
      return {
        ...preval,
        date: preval['date'].map((item, i) => (i === ind ? convertDateFormat(value) : item)),
      }
    })
  }
  const handleCreatePanel=async()=>{
    const resp=await API.createPanel({panelId:panel_id, newData:panelFormData});
    setLoading(true);
    if(resp.isSuccess){
        toast.success("Panel Created Successfully !!");
        setPanelFormData(initialCreateData);
        setOpenModal(false);
        setLoading(false);
        fetchPanel();
    }else{
        toast.error("Panel Creation Failed");
        setLoading(false);
    }

}
  const handleUpdatePanel = async (dataId) => {
    // console.log(dataId);
    const response = await API.updatePanel({ panelId: panel_id, dataId, newData: panelUpdateData });

    if (response.isSuccess) {
      setPanelUpdateData(initialUpdatePanelData);
      setPanelId(null);
      fetchPanel();
      toast.success("1 Row Updated");
    } else {
      toast.error("Updation Failed");
    }
  }
  const handleDeletePanel = async (id) => {
    if (window.confirm("Do You Really Want To Delete This Panel") === true) {
      const response = await API.deletePanel({ panelId:panel_id, dataId:id });
      if (response.isSuccess) {
        toast.success("Panel Deleted Successfully");
        fetchPanel();
      }else{
        toast.error("Panel Deletion Failed");
      }
    }
  }
  

  return (
    <div className="adminPanel">
      <div className="adminPanelWrap">
        <DashHeader title={"Panel Detail"} />
        <div className="filter">
          <button className="addBtn" onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
        </div>
        <div className="tableWrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
                <th>More Options</th>
              </tr>
            </thead>
            <tbody>
              {sortArrayByDate(panelData?.data)?.map((pannel, index) => {
                if (panelId === index) {
                  return (

                    <tr key={index}>
                      <td>
                        <div className="editDateWrap">
                          <p><input type="date" onChange={(e) => handleUpdateDateChange(e, 0)} name='date' /></p>
                          <p>To</p>
                          <p><input type="date" onChange={(e) => handleUpdateDateChange(e, 1)} name='date' /></p>
                        </div>
                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">

                          <div className="left">
                            <input type="text" name='monday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.monday.value[0]} />
                          </div>

                          <div className="mid">
                            <input type="text" name='monday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.monday.value[1]} />
                          </div>

                          <div className="right">
                            <input type="text" name='monday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.monday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='monday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.monday.hilite} />
                        </div>
                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">
                          <div className="left">
                            <input type="text" name='tueday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.tueday.value[0]} />
                          </div>
                          <div className="mid">
                            <input type="text" name='tueday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.tueday.value[1]} />
                          </div>
                          <div className="right">
                            <input type="text" name='tueday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.tueday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='tueday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.tueday.hilite} />
                        </div>
                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">
                          <div className="left">
                            <input type="text" name='wedday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.wedday.value[0]} />
                          </div>
                          <div className="mid">
                            <input type="text" name='wedday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.wedday.value[1]} />
                          </div>
                          <div className="right">
                            <input type="text" name='wedday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.wedday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='wedday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.wedday.hilite} />
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">
                          <div className="left">
                            <input type="text" name='thuday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.thuday.value[0]} />
                          </div>
                          <div className="mid">
                            <input type="text" name='thuday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.thuday.value[1]} />
                          </div>
                          <div className="right">
                            <input type="text" name='thuday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.thuday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='thuday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.thuday.hilite} />
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">
                          <div className="left">
                            <input type="text" name='friday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.friday.value[0]} />
                          </div>
                          <div className="mid">
                            <input type="text" name='friday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.friday.value[1]} />
                          </div>
                          <div className="right">
                            <input type="text" name='friday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.friday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='friday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.friday.hilite} />
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">
                          <div className="left">
                            <input type="text" name='satday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.satday.value[0]} />
                          </div>
                          <div className="mid">
                            <input type="text" name='satday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.satday.value[1]} />
                          </div>
                          <div className="right">
                            <input type="text" name='satday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.satday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='satday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.satday.hilite} />
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className="panelWeekWrap">
                          <div className="left">
                            <input type="text" name='sunday' onChange={(e) => handleUpdateInputChange(e, 0)} value={panelUpdateData.sunday.value[0]} />
                          </div>
                          <div className="mid">
                            <input type="text" name='sunday' onChange={(e) => handleUpdateInputChange(e, 1)} value={panelUpdateData.sunday.value[1]} />
                          </div>
                          <div className="right">
                            <input type="text" name='sunday' onChange={(e) => handleUpdateInputChange(e, 2)} value={panelUpdateData.sunday.value[2]} />
                          </div>
                        </div>
                        <div className="hilitie-box">
                          <input type="checkbox" name='sunday' onChange={handleUpdateHiliteChange} checked={panelUpdateData.sunday.hilite} />
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className="btnnWrap">
                          <button className="actn-btn" onClick={() => handleUpdatePanel(pannel._id)}><FaSave /></button>
                          <button className="actn-btn" onClick={()=>{setPanelFormData(initialCreateData);setPanelId(null)}} ><ImCancelCircle/></button>

                        </div>
                      </td>

                    </tr>
                  )
                }




                else {
                  return (

                    <tr key={index}>
                      <td>
                        <div className="editDateWrap">
                          <p>{pannel.date[0]}</p>
                          <p>To</p>
                          <p>{pannel.date[1]}</p>
                        </div>
                      </td>
                      {/* <td className="panelWeek">
                          <div className="panelWeekWrap">
  
                            <div className="left">
                              {pannel.monday.value[0] ? pannel.monday.value[0] : "***"}
                            </div>
  
                            <div className="mid">
                              {pannel.monday.value[1] ? pannel.monday.value[1] : "**"}
                            </div>
  
                            <div className="right">
                              {pannel.monday.value[2] ? pannel.monday.value[2] : "***"}
                            </div>
                          </div>
                        </td> */}
                      <td className="panelWeek">
                        <div className={pannel.monday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.monday.value[0] ? pannel.monday.value[0] : "***"}
                          </div>
                          <div className="mid">
                            {pannel.monday.value[1] ? pannel.monday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.monday.value[2] ? pannel.monday.value[2] : "***"}
                          </div>
                        </div>
                      </td>
                      <td className="panelWeek">
                        <div className={pannel.tueday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.tueday.value[0]}
                          </div>
                          <div className="mid">
                            {pannel.tueday.value[1] ? pannel.tueday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.tueday.value[2] ? pannel.tueday.value[2] : "***"}
                          </div>
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className={pannel.wedday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.wedday.value[0] ? pannel.wedday.value[0] : "***"}
                          </div>
                          <div className="mid">
                            {pannel.wedday.value[1] ? pannel.wedday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.wedday.value[2] ? pannel.wedday.value[2] : "***"}
                          </div>
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className={pannel.thuday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.thuday.value[0] ? pannel.thuday.value[0] : "***"}
                          </div>
                          <div className="mid">
                            {pannel.thuday.value[1] ? pannel.thuday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.thuday.value[2] ? pannel.thuday.value[2] : "***"}
                          </div>
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className={pannel.friday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.friday.value[0] ? pannel.friday.value[0] : "***"}
                          </div>
                          <div className="mid">
                            {pannel.friday.value[1] ? pannel.friday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.friday.value[2] ? pannel.friday.value[2] : "***"}
                          </div>
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className={pannel.satday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.satday.value[0] ? pannel.satday.value[0] : "***"}
                          </div>
                          <div className="mid">
                            {pannel.satday.value[1] ? pannel.satday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.satday.value[2] ? pannel.satday.value[2] : "***"}
                          </div>
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className={pannel.sunday.hilite ? "panelWeekWrap hilite" : "panelWeekWrap"}>
                          <div className="left">
                            {pannel.sunday.value[0] ? pannel.sunday.value[0] : "***"}
                          </div>
                          <div className="mid">
                            {pannel.sunday.value[1] ? pannel.sunday.value[1] : "**"}
                          </div>
                          <div className="right">
                            {pannel.sunday.value[2] ? pannel.sunday.value[2] : "***"}
                          </div>
                        </div>

                      </td>
                      <td className="panelWeek">
                        <div className="btnnWrap">
                          <button className="actn-btn" onClick={() => { setPanelUpdateData(pannel); setPanelId(index) }}><FaEdit /></button>
                          <button className="actn-btn" onClick={()=>handleDeletePanel(pannel._id)} ><FaTrash/></button>
                        </div>
                      </td>


                    </tr>
                  )
                }

              })}
            </tbody>

          </table>
        </div>
        <Modal title={"Add Panel"} openModal={openModal} setOpenModal={setOpenModal}>
          <div className="formWrap">
            <div className="form-grid">
              <div className="form-item">
                <div className="multi-item">
                  <label htmlFor="date">
                    Start Date
                    <input type="date" onChange={(e) => handleCreateDateChange(e, 0)} className='cust-input' placeholder='Starting Date' name='date' />
                  </label>
                  <label htmlFor="date">
                    End Date
                    <input type="date" onChange={(e) => handleCreateDateChange(e, 0)} className='cust-input' placeholder='End Date' name='date' />
                  </label>
                </div>
              </div>

              <div className="form-item">
                <label htmlFor="Monday">Monday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='monday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.monday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='monday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.monday.value[1]} placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='monday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.monday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='monday' onChange={handleCreateHiliteChange}/>
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="Monday">Tuesday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='tueday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.tueday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='tueday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.tueday.value[1]} placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='tueday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.tueday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='tueday' onChange={handleCreateHiliteChange}  />
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="Monday">Wednesday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='wedday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.wedday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='wedday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.wedday.value[1]}  placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='wedday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.wedday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='wedday' onChange={handleCreateHiliteChange} />
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="Monday">Thursday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='thuday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.thuday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='thuday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.thuday.value[1]} placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='thuday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.thuday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='thuday' onChange={handleCreateHiliteChange}   />
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="Monday">Friday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='friday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.friday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='friday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.friday.value[1]} placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='friday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.friday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='friday' onChange={handleCreateHiliteChange}   />
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="Monday">Saturday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='satday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.satday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='satday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.satday.value[1]} placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='satday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.satday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='satday' onChange={handleCreateHiliteChange}   />
                </div>
              </div>
              <div className="form-item">
                <label htmlFor="Monday">Sunday</label>
                <div className="multi-item">
                  <input type="text" className='cust-input' name='sunday' onChange={(e) => handleCreateInputChange(e, 0)} value={panelFormData.sunday.value[0]} placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' name='sunday' onChange={(e) => handleCreateInputChange(e, 1)} value={panelFormData.sunday.value[1]} placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' name='sunday' onChange={(e) => handleCreateInputChange(e, 2)} value={panelFormData.sunday.value[2]} placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="hilit-box">
                  <label htmlFor="">Highlight</label>
                  <input type="checkbox" name='sunday' onChange={handleCreateHiliteChange}  />
                </div>
              </div>
              <div className="form-item">
              {loading ? <Spinner/> : <button onClick={handleCreatePanel} >Submit</button>}
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Panel