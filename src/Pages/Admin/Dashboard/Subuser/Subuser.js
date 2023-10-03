import React, { useEffect, useRef, useState } from 'react';
import './subuser.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { FaTrash } from 'react-icons/fa';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { API } from '../../../../Services/Api';
import Spinner from '../../../../Components/Spinner/Spinner';

const initialfiltervalue = {
  searched: "",
  events: ""
}

const initialSignupFormData = {
  fullname: "",
  email: "",
  phonenumber: "",
  profilepic: "",
  password: ""
}

const Subuser = () => {
  const [openModal, setOpenModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [filteredTerm, setFilteredTerm] = useState(initialfiltervalue);
  const [sortBy, setSortBy] = useState("fullname");
  const [status, setStatus] = useState(false);
  const [searchSelected, setSearchSelected] = useState(false);
  const [pageNumbers, setPageNumbers] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  let [currentPage, setCurrentPage] = useState(1);
  const [toggle, setToggle] = useState(true);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [signupFormData, setSignupFormData] = useState(initialSignupFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("https://ik.imagekit.io/Aartificiers/SRBOSS/man.png?updatedAt=1696157370206");
  const tableRef = useRef(null);

  useEffect(() => {

    fetchData();
  }, [itemPerPage, currentPage, toggle, searchSelected]);

  const fetchData = async () => {
    setIsLoading(true);
    const response = await API.getSubAdmins({ limit: itemPerPage, page: currentPage });
    if (response.isSuccess) {
      
      setTableData(response.data.data || []);
      setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
      setIsLoading(false);

    } else {
      setIsLoading(false);
    }
  }


  const handleSearch = (e) => {
    const { name, value } = e.target;
    if (name === 'selected') {
      setSearchSelected(value);
    }
    setFilteredTerm((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
    else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  }

  const searchedTerms = filteredTerm.searched.toLowerCase().split(' ');
  const filteredData = tableData.filter((item) => {
    return searchedTerms.every((term) =>
      item.fullname.toLowerCase().includes(term) ||
      item.email.includes(term))
  }
  );

  const handleDeleteAdmin = async (id) => {
    if (window.confirm("Do You Really Want To Delete This Participant") === true) {
      const response = await API.deleteAdmin({ id });
      if (response.isSuccess) {
        setToggle(!toggle);
      }
    }
  }

  const handleInputChange = async (e) => {

    const { name, value } = e.target;
    if (name === "profilepic") {
      setAvatar(value);
      setSignupFormData((preval) => {
        return {
          ...preval,
          [name]: value
        }
      })
    }
    setSignupFormData((preval) => {
      return {
        ...preval,
        [name]: value
      }
    })
  }

  const handleSignup = async () => {
    setIsLoading(true);
    const resp = await API.subAdminReg(signupFormData);

    if (resp.isSuccess) {
      toast.success("Sub Admin Registerd Successfully");
      setSignupFormData(initialSignupFormData);
      setIsLoading(false);
      setOpenModal(false);
      fetchData();
    } else {
      toast.error("Error In Registring");
      setIsLoading(false);
    }

  }

  const handleItemPerpage = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(1);
  }


  return (
    <div className="subuser">
      <div className="subuserWrap">
        <DashHeader title={"User Details"} />
        <div className="filterActionBar">
          <div className="barLeft">

            <div className="input-wrap">
              <input onChange={handleSearch} type="text" placeholder='Search' name='searched' id='searched' />
            </div>

            <select value={itemPerPage} onChange={handleItemPerpage} name="noitem" id="status">
              <option value={5} >5</option>
              <option value={20} >20</option>
              <option value={40} >40</option>
              <option value={80} >80</option>
              <option value={100} >100</option>

            </select>

          </div>
          <div className="barRight">
            <button onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
          </div>
        </div>
        <div className="tableWrap">
          <table ref={tableRef} >
            <thead>
              <tr>
                <th onClick={() => handleSort("id")}>S.No</th>
                <th>Picture</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData && filteredData.length > 0 ? filteredData.map((data, indx) => {

                return (
                  <tr key={indx} style={{ background: data.selected ? "#5eff89" : "" }}>
                    <td>{indx + 1}</td>
                    <td><img src={data.profilepic} style={{ borderRadius: "50%" }} alt='prof' width={40} height={40} /></td>
                    <td>{data.fullname}</td>
                    <td>{data.email}</td>
                    <td>{data.phonenumber}</td>
                    <td>{data.role}</td>
                    <td><div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><button onClick={()=>handleDeleteAdmin(data._id)} className='actn-btn'><FaTrash/></button></div></td>
                  </tr>
                )
              }) : (
                <tr>
                  <td>{isLoading ? <p>Fetching Data...</p> : null}</td>
                  <td>No</td>
                  <td>Data</td>
                  <td>Availabe</td>
                  <td>At</td>
                  <td>This</td>
                  <td>Moment</td>
                  
                </tr>
              )}
            </tbody>
          </table>

          <div className="table-config">
            <div className="table-config-wrap">
              <div className="pagination-btn">
                <p>Pagination</p>
                <button onClick={() => { currentPage <= 1 ? setCurrentPage(currentPage) : setCurrentPage(--currentPage) }}><TbArrowWaveLeftDown /></button>
                <h1> {currentPage}</h1>
                <button onClick={() => { filteredData.length < currentPage || currentPage === pageNumbers ? setCurrentPage(currentPage) : setCurrentPage(++currentPage) }}><TbArrowWaveRightUp /></button>
              </div>
            </div>
          </div>


        </div>
        <Modal title={"Add User"} openModal={openModal} setOpenModal={setOpenModal}>
          <div className="formWrap">
            <div className="form-grid">
              <div className="form-item">
                <input type="text" className='cust-input' onChange={handleInputChange} value={signupFormData.fullname} placeholder='Full Name' name='fullname' />
              </div>
              <div className="form-item">
                <input type="email" className='cust-input' onChange={handleInputChange} value={signupFormData.email} placeholder='Email' name='email' />
              </div>
              <div className="form-item">
                <input type="tel" className='cust-input' onChange={handleInputChange} value={signupFormData.phonenumber} placeholder='Phone Number' name='phonenumber' />
              </div>
              <div className="form-item">
                <div className="avatar-cont">
                  <label htmlFor="ava1">
                    <input hidden type="radio" name='profilepic' id='ava1' onChange={handleInputChange} value={"https://ik.imagekit.io/Aartificiers/SRBOSS/man.png?updatedAt=1696157370206"} />
                    <img src="https://ik.imagekit.io/Aartificiers/SRBOSS/man.png?updatedAt=1696157370206" alt="avatar" />
                  </label>
                  <label htmlFor="ava2">
                    <input hidden type="radio" name='profilepic' id='ava2' onChange={handleInputChange} value={"https://ik.imagekit.io/Aartificiers/SRBOSS/woman%20(1).png?updatedAt=1696157358545"} />
                    <img src="https://ik.imagekit.io/Aartificiers/SRBOSS/woman%20(1).png?updatedAt=1696157358545" alt="avatar" />
                  </label>
                  <label htmlFor="ava3">
                    <input hidden type="radio" name='profilepic' id='ava3' onChange={handleInputChange} value={"https://ik.imagekit.io/Aartificiers/SRBOSS/man%20(1).png?updatedAt=1696157366205"} />
                    <img src="https://ik.imagekit.io/Aartificiers/SRBOSS/man%20(1).png?updatedAt=1696157366205" alt="avatar" />
                  </label>
                  <label htmlFor="ava4">
                    <input hidden type="radio" name='profilepic' id='ava4' onChange={handleInputChange} value={"https://ik.imagekit.io/Aartificiers/SRBOSS/woman.png?updatedAt=1696157354547"} />
                    <img src="https://ik.imagekit.io/Aartificiers/SRBOSS/woman.png?updatedAt=1696157354547" alt="avatar" />
                  </label>
                  <label htmlFor="ava5">
                    <input hidden type="radio" name='profilepic' id='ava5' onChange={handleInputChange} value={"https://ik.imagekit.io/Aartificiers/SRBOSS/profile.png?updatedAt=1696157362090"} />
                    <img src="https://ik.imagekit.io/Aartificiers/SRBOSS/profile.png?updatedAt=1696157362090" alt="avatar" />
                  </label>

                  <div>Selected -</div>

                  <label>
                    <img src={avatar} alt="selected" />
                  </label>
                </div>
              </div>
              <div className="form-item">
                <input type="password" className='cust-input' value={signupFormData.password} onChange={handleInputChange} placeholder='Password' name='password' />
              </div>

              <div className="form-item">
                <button onClick={handleSignup}>{isLoading ? <Spinner/> : "SUBMIT"}</button>
              </div>
            </div>
          </div>
        </Modal>

      </div>
    </div>
  )
}

export default Subuser