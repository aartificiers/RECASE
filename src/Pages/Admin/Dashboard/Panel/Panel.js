import React from 'react';
import './panel.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { panneldata } from '../../../../Constants/dummy';
import Modal from '../../../../Components/AdminComponents/modal/Modal';

const Panel = () => {
    const [panelId, setPanelId] = useState(null)

    const [openModal, setOpenModal] = useState(false);
  
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
                {panneldata.data.map((pannel, index) => {
                  if (panelId === index) {
                    return (
  
                      <tr key={index}>
                        <td>
                          <div className="editDateWrap">
                            <p><input type="text" value={pannel.date[0]} /></p>
                            <p>To</p>
                            <p><input type="text" value={pannel.date[1]} /></p>
                          </div>
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
  
                            <div className="left">
                              <input type="text" value={pannel.monday.value[0] ? pannel.monday.value[0] : "***"} />
                            </div>
  
                            <div className="mid">
                              <input type="text" value={pannel.monday.value[1] ? pannel.monday.value[1] : "**"} />
                            </div>
  
                            <div className="right">
                              <input type="text" value={pannel.monday.value[2] ? pannel.monday.value[2] : "***"} />
                            </div>
                          </div>
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              <input type="text" value={pannel.tueday.value[0] ? pannel.tueday.value[0] : "***"} />
                            </div>
                            <div className="mid">
                              <input type="text" value={pannel.tueday.value[1] ? pannel.tueday.value[1] : "**"} />
                            </div>
                            <div className="right">
                              <input type="text" value={pannel.tueday.value[2] ? pannel.tueday.value[2] : "***"} />
                            </div>
                          </div>
  
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              <input type="text" value={pannel.wedday.value[0] ? pannel.wedday.value[0] : "***"} />
                            </div>
                            <div className="mid">
                              <input type="text" value={pannel.wedday.value[1] ? pannel.wedday.value[1] : "**"} />
                            </div>
                            <div className="right">
                              <input type="text" value={pannel.wedday.value[2] ? pannel.wedday.value[2] : "***"} />
                            </div>
                          </div>
  
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              <input type="text" value={pannel.thuday.value[0] ? pannel.thuday.value[0] : "***"} />
                            </div>
                            <div className="mid">
                              <input type="text" value={pannel.thuday.value[1] ? pannel.thuday.value[1] : "**"} />
                            </div>
                            <div className="right">
                              <input type="text" value={pannel.thuday.value[2] ? pannel.thuday.value[2] : "***"} />
                            </div>
                          </div>
  
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              <input type="text" value={pannel.friday.value[0] ? pannel.friday.value[0] : "***"} />
                            </div>
                            <div className="mid">
                              <input type="text" value={pannel.friday.value[1] ? pannel.friday.value[1] : "**"} />
                            </div>
                            <div className="right">
                              <input type="text" value={pannel.friday.value[2] ? pannel.friday.value[2] : "***"} />
                            </div>
                          </div>
  
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              <input type="text" value={pannel.satday.value[0] ? pannel.satday.value[0] : "***"} />
                            </div>
                            <div className="mid">
                              <input type="text" value={pannel.satday.value[1] ? pannel.satday.value[1] : "**"} />
                            </div>
                            <div className="right">
                              <input type="text" value={pannel.satday.value[2] ? pannel.satday.value[2] : "***"} />
                            </div>
                          </div>
  
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              <input type="text" value={pannel.sunday.value[0] ? pannel.sunday.value[0] : "***"} />
                            </div>
                            <div className="mid">
                              <input type="text" value={pannel.sunday.value[1] ? pannel.sunday.value[1] : "**"} />
                            </div>
                            <div className="right">
                              <input type="text" value={pannel.sunday.value[2] ? pannel.sunday.value[2] : "***"} />
                            </div>
                          </div>
  
                        </td>
                        <td className="panelWeek">
                          <div className="btnnWrap">
                            <button className="editBtn" onClick={() => setPanelId(null)}>Save</button>
                            <button className="editBtn">Delete</button>
                            
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
                        </td>
                        <td className="panelWeek">
                          <div className="panelWeekWrap">
                            <div className="left">
                              {pannel.tueday.value[0] ? pannel.tueday.value[0] : "***"}
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
                          <div className="panelWeekWrap">
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
                          <div className="panelWeekWrap">
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
                          <div className="panelWeekWrap">
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
                          <div className="panelWeekWrap">
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
                          <div className="panelWeekWrap">
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
  
                            <button className="editBtn" onClick={() => { console.log("clicked"); setPanelId(index) }}>Edit</button>
                            <button className="editBtn">Delete</button>
                            
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
                <div className="form-item multi-item">
                  <input type="text" className='cust-input' placeholder='Starting Date' />
                  <input type="text" className='cust-input' placeholder='End Date' />
                </div>
                <div className="form-item">
                  <input type="text" className='cust-input' placeholder='Day (e.g. "Monday")' />
                </div>
                <div className="form-item multi-item">
                  <input type="email" className='cust-input' placeholder='Add Digits (e.g "123")' />
                  <input type="text" className='cust-input' placeholder='Add Digits (e.g "45")' />
                  <input type="text" className='cust-input' placeholder='Add Digits (e.g "678")' />
                </div>
                <div className="form-item">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    )
}

export default Panel