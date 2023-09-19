import React, { useState } from 'react';
import './subuser.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { DataGrid } from "@mui/x-data-grid"; 
import { subUserData } from '../../../../Constants/dummy';

const Subuser = () => {
    const [openModal, setOpenModal] = useState(false);
    const column = [
      {
        field: "id",
        headerName: "S.NO",
        flex: 1,
      },
      {
        field: "name",
        headerName: "Name",
        flex: 1,
      },
      {
        field: "gameName",
        headerName: "Game Name",
        flex: 1,
      },
      {
        field: "contact",
        headerName: "Contact",
        flex: 1,
      },
    ];
    return (
      <div className="subuser">
        <div className="subuserWrap">
          <DashHeader title={"User Details"} />
          <div className="filterActionBar">
            <div className="barLeft">
  
              <select name="" id="">
                <option value="">select 1</option>
                <option value="">select 1</option>
                <option value="">select 1</option>
                <option value="">select 1</option>
                <option value="">select 1</option>
              </select>
  
            </div>
            <div className="barRight">
              <button onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
            </div>
          </div>
          <div className="tableWrap">
            {/* <table>
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Name</th>
                  <th>Game Name </th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Animesh</td>
                  <td>Padhmavath</td>
                  <td>45861759211</td>
                  <td>
                    <div className="btns">
                      <button><AiTwotoneEdit /></button>
                      <button><AiOutlineDelete /></button>
                      <button><AiOutlineStar /></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table> */}
            <DataGrid rows={subUserData} columns={column} initialState={{pagination:{paginationModel:{page:0,pageSize:5}}}} pageSizeOptions={[5,10]} checkboxSelection/>
          </div>
          <Modal title={"Add User"} openModal={openModal} setOpenModal={setOpenModal}>
            <div className="formWrap">
              <div className="form-grid">
                <div className="form-item">
                  <input type="text" className='cust-input' placeholder='User Name' />
                </div>
                <div className="form-item">
                  <input type="text" className='cust-input' placeholder='Game Type' />
                </div>
                <div className="form-item">
                  <input type="text" className='cust-input' placeholder='Game Name' />
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

export default Subuser