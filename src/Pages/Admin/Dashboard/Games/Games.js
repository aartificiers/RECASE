import React, { useEffect, useRef, useState } from 'react';
import './games.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { useSelector } from 'react-redux';
import { API } from '../../../../Services/Api';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { BiLogoGmail, BiSolidPhoneCall } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { toast } from 'react-toastify';
import AutoComplete from '../../../../Components/AutoComplete/AutoComplete';

const initialfiltervalue = {
    searched: "",
    events: ""
}

const initialGameFormData = {
    gamename: "",
    gametype: "Mumbai Side",
    result: "",
    time: "",
    owner_id: ""
}
const initialGameUpdateData = {
    gamename: "",
    gametype: "Mumbai Side",
    result: "",
    time: "",
}

const Games = () => {
    const userInfo = useSelector(state => state.user);
    const [openModal, setOpenModal] = useState(false);
    const [ownerModal,setOwnerModal]=useState(false);
    const [ownerDetailsModal,setOwnerDetailsModal]=useState(false);
    const [ownerDetails,setOwnerDetails]=useState({});
    const [selectedGammeForOwner,setSelectedGame]=useState(null);
    const [tableData, setTableData] = useState([]);
    const [filteredTerm, setFilteredTerm] = useState(initialfiltervalue);
    const [sortBy, setSortBy] = useState("fullname");
    const [searchSelected, setSearchSelected] = useState(false);
    const [pageNumbers, setPageNumbers] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc");
    let [currentPage, setCurrentPage] = useState(1);
    const [toggle, setToggle] = useState(true);
    const [itemPerPage, setItemPerPage] = useState(5);
    const [gameFormData, setGameFormData] = useState(initialGameFormData);
    const [gameUpdateData, setGameUpdateData] = useState(initialGameUpdateData);
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);

    useEffect(() => {

        fetchGames();
    }, [itemPerPage, currentPage, toggle, searchSelected]);

    const fetchGames = async () => {
        setIsLoading(true);
        let response = null;
        if (userInfo.user.role === "BENJO") {
            response = await API.getAllGames({ limit: itemPerPage, page: currentPage });
        } else {
            response = await API.getOwnersGames({ limit: itemPerPage, page: currentPage, owner_id: userInfo.user.id });
        }

        if (response.isSuccess) {
            console.log("eddfrer", response);
            setTableData(response.data.data || []);
            setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
            setIsLoading(false);

        } else {
            setIsLoading(false);
            console.log("error");

        }
    }

    const fetchIndividualAdmin= async(id)=>{
        const resp=await API.getSubAdminsById({id:id});

        if(resp.isSuccess){
            setOwnerDetails(resp.data);
            setOwnerDetailsModal(true);
        }else{
            toast.error(resp.errormsg);
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
            item.gamename.toLowerCase().includes(term) ||
            item.result.toLowerCase().includes(term) ||
            item.time.toLowerCase().includes(term))
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
        setGameFormData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    const handleUpdateInputChange = async (e) => {

        const { name, value } = e.target;
        setGameUpdateData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const handleCreateGame = async () => {
        setIsLoading(true);
        const resp = await API.createGame(gameFormData);

        if (resp.isSuccess) {
            toast.success("Game Created Successfully");
            setGameFormData(initialGameFormData);
            setIsLoading(false);
            setOpenModal(false);
            fetchGames();
        } else {
            toast.error(resp.errormsg);
            setIsLoading(false);
        }

    }

    const handleUpdateGame=async (id)=>{

        const response=await API.updateGame({id,updateData:gameUpdateData});

        if(response.isSuccess){
            toast.success("One Row Updated Successfully");
            setEditingId(null);
            fetchGames();
        }else{
            toast.error("Updation Failed");
        }

    }

    const handleItemPerpage = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handleOwnerSelect= async(value)=>{
        
        const resp=await API.updateGame({id:selectedGammeForOwner._id,updateData:{owner_id:value._id}});

        if(resp.isSuccess){
            toast.success(`${value.fullname} is Owner Of ${selectedGammeForOwner.gamename}`);
            setSelectedGame(null);
            setOwnerModal(false);
            fetchGames();
        }else{
            toast.error("Owner Updation Failed !!");
        }
    }

    console.log(ownerDetails);


    return (
        <div className="game">
            <div className="game-wrap">
                <DashHeader title={"Game Details"} />
                <div className="filterBar">
                    <div className="leftbar">
                        <div className="input-wrap">
                            <input onChange={handleSearch} type="text" placeholder='Search' name='searched' />
                        </div>

                        <select value={itemPerPage} onChange={handleItemPerpage} name="noitem" id="status">
                            <option value={5} >5</option>
                            <option value={20} >20</option>
                            <option value={40} >40</option>
                            <option value={80} >80</option>
                            <option value={100} >100</option>

                        </select>
                    </div>
                    <div className="rightbar">
                        <button onClick={() => setOpenModal(true)}><BsPlusSquare /></button>
                    </div>
                </div>
                <div className="tableBody">
                    <table ref={tableRef} >
                        <thead>
                            <tr>
                                <th onClick={() => handleSort("id")}>S.No</th>
                                <th>Game</th>
                                <th>Type</th>
                                <th>Result</th>
                                <th>Owner</th>
                                <th>Time</th>
                                <th>Jodi</th>
                                <th>Panel</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData && filteredData.length > 0 ? filteredData.map((data, indx) => {

                                return (
                                    <tr key={indx} style={{ background: data.hilite ? "#5eff89" : "" }}>
                                        <td>{indx + 1}</td>
                                        <td>{editingId === data._id ? <input type='text' name='gamename' onChange={handleUpdateInputChange} value={gameUpdateData.gamename} /> : data.gamename}</td>
                                        <td>{editingId === data._id ?
                                            <select name="gametype" id="gametype" onChange={handleUpdateInputChange} value={gameUpdateData.gametype} >
                                                <option hidden selected>Choose Type</option>
                                                <option value="Mumbai Side">Mumbai Side Game</option>
                                                <option value="Delhi Side">Delhi Side Game</option>
                                                <option value="Star Line">Star Line Game</option>
                                            </select> : data.gametype}</td>
                                        <td>{editingId === data._id ? <input type='text' name='result' onChange={handleUpdateInputChange} value={gameUpdateData.result} /> : data.result}</td>
                                        <td>{data.owner_id != null && data.owner_id !== "" ? <button onClick={()=>fetchIndividualAdmin(data.owner_id)}>Owner</button> : <button onClick={()=>{setSelectedGame(data);setOwnerModal(true)}} >Add</button>}</td>
                                        <td>{editingId === data._id ? <input type='text' name='time' onChange={handleUpdateInputChange} value={gameUpdateData.time} /> : data.time}</td>
                                        <td><Link to={`/admin/dashboard/jodi/${data.jodi_id}`}>Jodi</Link></td>
                                        <td><button>Panel</button></td>
                                        <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center",gap:"5px" }}>{editingId === data._id ? <button className='actn-btn' onClick={() => handleUpdateGame(data._id)}><FaSave /></button> : <button className='actn-btn' onClick={() => { setGameUpdateData({gamename:data.gamename,gametype:data.gametype,result:data.result,time:data.time});setEditingId(data._id) }}><FaEdit /></button>} <button onClick={() => handleDeleteAdmin(data._id)} className='actn-btn'><FaTrash /></button>  </div></td>
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
                <Modal title={"Add Games"} openModal={openModal} setOpenModal={setOpenModal}>
                    <div className="formWrap">
                        <div className="form-grid">
                            <div className="form-item">
                                <input type="text" className='cust-input' value={gameFormData.gamename} onChange={handleInputChange} placeholder='Game Name' name='gamename' />
                            </div>
                            <div className="form-item">
                                <select className='cust-select' name="gametype" id="gametype" value={gameFormData.gametype} onChange={handleInputChange}>
                                    <option value="Mumbai Side">Mumbai Side Game</option>
                                    <option value="Delhi Side">Delhi Side Game</option>
                                    <option value="Star Line">Star Line Game</option>
                                </select>
                            </div>
                            <div className="form-item">
                                <input type="text" className='cust-input' value={gameFormData.result} onChange={handleInputChange} placeholder='Result' name='result' />
                            </div>
                            <div className="form-item">
                                <input type="email" className='cust-input' value={gameFormData.time} onChange={handleInputChange} placeholder='time' name='time' />
                            </div>
                            <div className="form-item">
                                <button onClick={handleCreateGame}>Submit</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal title={"Add Owner"} openModal={ownerModal} setOpenModal={setOwnerModal} >
                
                    <h1>Select Owner For <span style={{color:"var(--neon-green)"}}>{selectedGammeForOwner?.gamename.toUpperCase()}</span> </h1>
                    <br /><br />
                    <AutoComplete onSelect={handleOwnerSelect} />

                </Modal>

                <Modal title={"Game Owner Details"} openModal={ownerDetailsModal} setOpenModal={setOwnerDetailsModal} >

                    <div className="owner-details">
                        <img src={ownerDetails.profilepic} alt="avatar" width={150} height={150} style={{borderRadius:"8px"}} />
                        <br /><br />
                        <h1>{ownerDetails?.fullname}</h1>
                        <br />
                        <h3><BiLogoGmail/> <a style={{color:"var(--scclr)"}} href={`mailto:${ownerDetails?.email}`}>{ownerDetails?.email}</a></h3><br />
                        <h3><BiSolidPhoneCall/> <a style={{color:"var(--scclr)"}} href={`tel:${ownerDetails?.phonenumber}`}> {ownerDetails?.phonenumber}</a></h3>
                    </div>

                </Modal>
            </div>
        </div>
    )
}

export default Games