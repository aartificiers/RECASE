import React from 'react';
import './jodi.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { jodidata } from '../../../../Constants/dummy';

const Jodi = () => {
    const [openModal, setOpenModal] = useState(false);
    const [editId, setEditId] = useState(null)
    return (
        <div className="adminjodi">
            <div className="adminjodiWrap">
                <DashHeader title={"Jodi Details"} />
                <div className="filter">
                    <button className="addBtn" onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
                </div>
                <div className="tableWrap">
                    <table>
                        <thead>
                            <tr>
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
                            {jodidata.data.map((pannel, index) => {
                                if (editId === index) {
                                    return (
                                        <tr key={index}>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.monday.value ? pannel.monday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.tueday.value ? pannel.tueday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.wedday.value ? pannel.wedday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.thuday.value ? pannel.thuday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.friday.value ? pannel.friday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.satday.value ? pannel.satday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    <input type="text" value={pannel.sunday.value ? pannel.sunday.value : "**"} />
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="btnWrap">
                                                    <button className='btns' onClick={() => setEditId(null)}>Save</button>
                                                    <button className='btns'>Delete</button>

                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                else {

                                    return (
                                        <tr key={index}>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.monday.value ? pannel.monday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.tueday.value ? pannel.tueday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.wedday.value ? pannel.wedday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.thuday.value ? pannel.thuday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.friday.value ? pannel.friday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.satday.value ? pannel.satday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="weekWrap">
                                                    {pannel.sunday.value ? pannel.sunday.value : "**"}
                                                </div>
                                            </td>
                                            <td className="week">
                                                <div className="btnWrap">
                                                    <button className='btns' onClick={() => { console.log("clicked"); setEditId(index) }}>Edit</button>
                                                    <button className='btns'>Delete</button>

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
                                <input type="text" className='cust-input' placeholder='Day (e.g. "Monday")' />
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' placeholder='Jodi No. (e.g. "12")' />
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

export default Jodi