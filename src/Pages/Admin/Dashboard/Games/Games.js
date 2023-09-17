import React from 'react';
import './games.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import Modal from '../../../../Components/AdminComponents/modal/Modal';

const Games = () => {
    const [openModal, setOpenModal] = useState(false);
    const column = [
        {
            field: "id",
            headerName: "S.NO",
            flex: 1,
        },
        {
            field: "gameName",
            headerName: "Game Name",
            flex: 1,
        },
        {
            field: "result",
            headerName: "Result",
            flex: 1,
        },
        {
            field: "time",
            headerName: "Time",
            flex: 1,
        },
    ];
    return (
        <div className="game">
            <div className="game-wrap">
                <DashHeader title={"User Details"} />
                <div className="filterBar">
                    <div className="leftbar">
                        <select name="" id="">
                            <option value="">select 1</option>
                            <option value="">select 1</option>
                            <option value="">select 1</option>
                            <option value="">select 1</option>
                            <option value="">select 1</option>
                        </select>
                    </div>
                    <div className="rightbar">
                        <button onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
                    </div>
                </div>
                <div className="tableBody">
                    {/* <DataGrid rows={dashGameData} columns={column} initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }} pageSizeOptions={[5, 10]} checkboxSelection /> */}
                </div>
                <Modal title={"Add Games"} openModal={openModal} setOpenModal={setOpenModal}>
                    <div className="formWrap">
                        <div className="form-grid">
                            <div className="form-item">
                                <input type="text" className='cust-input' placeholder='Game Name' />
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' placeholder='Game Type' />
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' placeholder='Result' />
                            </div>
                            <div className="form-item">
                                <input type="email" className='cust-input' placeholder='Email' />
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' placeholder='Contact No.' />
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

export default Games