import React, { useEffect, useRef, useState } from 'react';
import './games.scss';
import DashHeader from '../../../../Components/AdminComponents/HeaderCompponent/DashHeader';
import { BsPlusSquare } from 'react-icons/bs';
import Modal from '../../../../Components/AdminComponents/modal/Modal';
import { useSelector } from 'react-redux';
import { API } from '../../../../Services/Api';
import { FaEdit, FaEye, FaSave, FaTrash } from 'react-icons/fa';
import { PiProhibitFill } from 'react-icons/pi';
import { BiLogoGmail, BiSolidPhoneCall } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { TbArrowWaveLeftDown, TbArrowWaveRightUp } from 'react-icons/tb';
import { toast } from 'react-toastify';
import AutoComplete from '../../../../Components/AutoComplete/AutoComplete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { checkLiveOut } from '../../../../Utils/DateFormat';
import Spinner from '../../../../Components/Spinner/Spinner';

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
    hilite: false,
}

const initialLiveData = {
    live_start_time: "",
    live_end_time: "",
}

const Games = () => {
    const userInfo = useSelector(state => state.user);
    const [openModal, setOpenModal] = useState(false);
    const [ownerModal, setOwnerModal] = useState(false);
    const [ownerDetailsModal, setOwnerDetailsModal] = useState(false);
    const [liveModal, setLiveModal] = useState(false);
    const [liveFormData, setLiveFormData] = useState(initialLiveData);
    const [makeLiveId, setMakeLiveId] = useState(null);
    const [ownerDetails, setOwnerDetails] = useState({});
    const [selectedGammeForOwner, setSelectedGame] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [deletedGames, setDeletedGames] = useState([]);
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
        fetchDeletedGames();
    }, [itemPerPage, currentPage, toggle, searchSelected]);

    useEffect(() => {
        const checkInterval = 5000; // 5 seconds
        let previousStatus = false;
    
        const checkLiveOutAndAlert = async() => {
          const result = checkLiveOut(tableData);
    
          if (result.status === true && previousStatus === false) {
            const response=await API.updateSpecificGames({ids:result.ids,updateData:{islive:false,live_start_time:"",live_end_time:""}});
            if(response.isSuccess){
                toast.info("Live Session Over Checkout");
                fetchGames();
            }else{
                toast.info("Session time are remaining");
            }
          }
    
          previousStatus = result.status;
        };
    
        // Initial check
        checkLiveOutAndAlert();
    
        // Set up an interval to check every 5 seconds
        const intervalId = setInterval(checkLiveOutAndAlert, checkInterval);
    
        return () => {
          clearInterval(intervalId);
        };
      }, [tableData]);

    const fetchGames = async () => {
        setIsLoading(true);
        let response = null;
        if (userInfo.user.role === "BENJO") {
            response = await API.getAllGames({ limit: itemPerPage, page: currentPage });
        } else {
            response = await API.getOwnersGames({ limit: itemPerPage, page: currentPage, owner_id: userInfo.user.id });
        }

        if (response.isSuccess) {

            setTableData(response.data.data || []);
            setPageNumbers(Math.ceil(response.data.totalCount / itemPerPage));
            setIsLoading(false);

        } else {
            setIsLoading(false);
            console.log("error");

        }
    }
    const fetchDeletedGames = async () => {
        let response = null;
        if (userInfo.user.role === "BENJO") {
            response = await API.getAllDeletedGames();

            if (response.isSuccess) {
                setDeletedGames(response.data.data);
            }
        }
    }

    const fetchIndividualAdmin = async (id, gameId) => {
        const resp = await API.getSubAdminsById({ id: id });

        if (resp.isSuccess) {
            setOwnerDetails(resp.data);
            setOwnerDetailsModal(true);
        } else {
            toast.error("Owner Not Found");
            toast.warning("Owner Removal Started");
            const response = await API.updateGame({ id: gameId, updateData: { owner_id: "" } });
            if (response.isSuccess) {
                toast.success("Owner Removed From This Game Successfully");
                fetchGames();
            } else {
                toast.error("Owner removal failed");
            }

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

    const handleDeleteGame = async (game) => {
        if (window.confirm("Do You Really Want To Delete This Game") === true) {
            const response = await API.updateGame({ id: game._id, updateData: { isDeleted: true } });
            setIsLoading(true);
            if (response.isSuccess) {
                const resp = await API.updateMainJodi({ id: game.jodi_id, updateData: { isDeleted: true } });
                const rep = await API.updateMainPanel({ id: game.panel_id, updateData: { isDeleted: true } });

                if (resp.isSuccess && rep.isSuccess) {
                    toast.success("Deleted Successfully");
                    setToggle(!toggle);
                    setIsLoading(false);
                } else {
                    toast.error("Deletion Failed");
                    setIsLoading(false);

                }
            } else {
                toast.error("Deletion Failed !!");
            }
        }
    }
    const handleUnhideGame = async (game) => {
        if (window.confirm("Do You Really Want To Take Back This Game") === true) {
            const response = await API.updateGame({ id: game._id, updateData: { isDeleted: false } });
            if (response.isSuccess) {
                const resp = await API.updateMainJodi({ id: game.jodi_id, updateData: { isDeleted: false } });
                const rep = await API.updateMainPanel({ id: game.panel_id, updateData: { isDeleted: false } });
                if (resp.isSuccess && rep.isSuccess) {
                    toast.success("Taken Game Back Successfully");
                    setToggle(!toggle);
                    setIsLoading(false);
                } else {
                    toast.error('Reverting Failed');
                    setIsLoading(false);
                }
            } else {
                toast.error("Unhide failed !!");
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
    const handleLiveInputChange = (e) => {
        const { name, value } = e.target;

        setLiveFormData(preval => {
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
    const handleUpdateHiliteChange = async (e) => {

        const { name, checked } = e.target;
        setGameUpdateData((preval) => {
            return {
                ...preval,
                hilite: checked
            }
        })
    }
   
    const handleCreateGame = async () => {
        setIsLoading(true);
        const resp = await API.createGame({ seq: tableData.length <= 0 ? 0 : tableData.length, ...gameFormData });

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

    const handleUpdateGame = async (id) => {

        const response = await API.updateGame({ id, updateData: gameUpdateData });

        if (response.isSuccess) {
            toast.success("One Row Updated Successfully");
            setEditingId(null);
            fetchGames();
        } else {
            toast.error("Updation Failed");
        }

    }

    const handleRevokeLive=async(id)=>{
        const resp=await API.updateGame({id,updateData:{islive:false,live_start_time:"",live_end_time:""}});
        if(resp.isSuccess){
            toast.success("Live Revoked");
            fetchGames();
        }else{
            toast.error("Revoke Failed");
        }
    }

    const handleItemPerpage = (e) => {
        setItemPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handleOwnerSelect = async (value) => {

        const resp = await API.updateGame({ id: selectedGammeForOwner._id, updateData: { owner_id: value._id } });

        if (resp.isSuccess) {
            toast.success(`${value.fullname} is Owner Of ${selectedGammeForOwner.gamename}`);
            setSelectedGame(null);
            setOwnerModal(false);
            fetchGames();
        } else {
            toast.error("Owner Updation Failed !!");
        }
    }

    const handleSaveLiveUpdate = async (id) => {
        setIsLoading(true);
        const response = await API.updateGame({ id: makeLiveId, updateData: { ...liveFormData, islive: true } });
        if (response.isSuccess) {
            toast.success("Game Is Live Now");
            setLiveFormData(initialLiveData);
            setMakeLiveId(null);
            setLiveModal(false);
            setIsLoading(false);
            fetchGames();
        } else {
            setIsLoading(false);
            toast.error("Failed to Update !");
        }

    }



    const handleDragEnd = async (result) => {
        if (!result.destination) return; // No change in order

        if (userInfo.user.role !== 'BENJO') {
            toast.error("Access Denied !!");
            return null;
        }

        const reorderedItems = [...tableData];
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);

        // Update the order in the database
        const updatedItems = reorderedItems.map((item, index) => ({
            id: item._id,
            seq: index,
        }));

        const res = await API.updateOneGame({ items: updatedItems });
        if (res.isSuccess) {
            fetchGames();
        }
    };


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
                        {userInfo.user.role === "BENJO" && <button onClick={() => setOpenModal(true)}><BsPlusSquare /></button>}
                    </div>
                </div>
                <div className="tableBody">
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="items">
                            {(provided, snapshot) => (
                                <table {...provided.droppableProps} ref={provided.innerRef} style={{ background: snapshot.isDraggingOver ? 'lightgray' : 'white', }} >
                                    <thead>
                                        <tr>
                                            <th onClick={() => handleSort("id")}>S.No</th>
                                            <th>Game</th>
                                            <th>Type</th>
                                            <th>Result</th>
                                            {userInfo.user.role === "BENJO" && <th>Owner</th>}
                                            <th>Time</th>
                                            <th>Highlighted</th>
                                            <th>Live</th>
                                            <th>Jodi</th>
                                            <th>Panel</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData && filteredData.length > 0 ? filteredData.map((data, indx) => {

                                            return (
                                                <Draggable key={data._id} draggableId={data._id} index={indx}>
                                                    {(provided, snapshot) => (
                                                        <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={{ background: data.hilite && userInfo.user.role === "BENJO" ? "#ff96ad" : "", backgroundColor: snapshot.isDragging ? 'lightblue' : 'white', ...provided.draggableProps.style, }}>
                                                            <td>{data.seq}</td>
                                                            <td>{editingId === data._id && userInfo.user.role === "BENJO" ? <input type='text' name='gamename' onChange={handleUpdateInputChange} value={gameUpdateData.gamename} /> : data.gamename}</td>
                                                            <td>{editingId === data._id ?
                                                                <select name="gametype" id="gametype" onChange={handleUpdateInputChange} value={gameUpdateData.gametype} >
                                                                    <option hidden selected>Choose Type</option>
                                                                    <option value="Mumbai Side">Mumbai Side Game</option>
                                                                    <option value="Delhi Side">Delhi Side Game</option>
                                                                    <option value="Star Line">Star Line Game</option>
                                                                </select> : data.gametype}</td>
                                                            <td>{editingId === data._id ? <input type='text' name='result' onChange={handleUpdateInputChange} value={gameUpdateData.result} /> : data.result}</td>
                                                            {userInfo.user.role === "BENJO" && <td>{data.owner_id != null && data.owner_id !== "" ? <button className='actn-btn' onClick={() => { fetchIndividualAdmin(data.owner_id, data._id) }}>Owner</button> : <button className='actn-btn' onClick={() => { setSelectedGame(data); setOwnerModal(true) }} >Add</button>}</td>}
                                                            <td>{editingId === data._id ? <input type='text' name='time' onChange={handleUpdateInputChange} value={gameUpdateData.time} /> : data.time}</td>
                                                            <td>{editingId === data._id && userInfo.user.role === "BENJO" ? <input type='checkbox' checked={gameUpdateData.hilite} onChange={handleUpdateHiliteChange} /> : data.hilite ? "YES" : "NO"}</td>
                                                            <td>{userInfo.user.role === "BENJO" && data.islive===true ? <div style={{display:"flex",gap:"10px",alignItems:"center"}} ><div className='flashing-dot'></div><button title='Unlive' className='actn-btn' ><PiProhibitFill/></button></div>  : <button className='actn-btn' onClick={() => { setLiveModal(!liveModal); setMakeLiveId(data._id) }}>Live</button>}</td>
                                                            <td><Link className='actn-btn' to={`/admin/dashboard/jodi/${data.jodi_id}`}>Jodi</Link></td>
                                                            <td><Link className='actn-btn' to={`/admin/dashboard/panel/${data.panel_id}`}>Panel</Link></td>
                                                            <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>{editingId === data._id ? <button className='actn-btn' onClick={() => handleUpdateGame(data._id)}><FaSave /></button> : <button className='actn-btn' onClick={() => { setGameUpdateData({ gamename: data.gamename, gametype: data.gametype, result: data.result, time: data.time, hilite: data.hilite }); setEditingId(data._id) }}><FaEdit /></button>} {userInfo.user.role === "BENJO" && <button onClick={() => handleDeleteGame(data)} className='actn-btn'><FaTrash /></button>} </div></td>
                                                        </tr>
                                                    )}
                                                </Draggable>
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
                            )}

                        </Droppable>
                    </DragDropContext>


                </div>
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


                {userInfo.user.role === "BENJO" ? (
                    <div className="tableBody">
                        <h3>Deleted Games</h3>
                        <table >
                            <thead>
                                <tr>
                                    <th onClick={() => handleSort("id")}>S.No</th>
                                    <th>Game</th>
                                    <th>Type</th>
                                    <th>Result</th>
                                    <th>Owner</th>
                                    <th>Time</th>
                                    <th>Highlighted</th>
                                    <th>Live</th>
                                    <th>Jodi</th>
                                    <th>Panel</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deletedGames && deletedGames.length > 0 ? deletedGames.map((data, indx) => {

                                    return (
                                        <tr key={indx} style={{ background: data.hilite && userInfo.user.role === "BENJO" ? "#ff96ad" : "" }}>
                                            <td>{indx + 1}</td>
                                            <td>{data.gamename}</td>
                                            <td>{data.gametype}</td>
                                            <td>{data.result}</td>
                                            <td>{data.owner_id != null && data.owner_id !== "" ? <button className='actn-btn' onClick={() => { fetchIndividualAdmin(data.owner_id, data._id) }}>Owner</button> : null}</td>
                                            <td>{data.time}</td>
                                            <td>{data.hilite ? "YES" : "NO"}</td>
                                            <td>{data.islive ? <div className='flashing-dot'></div> : "NO"}</td>
                                            <td><Link className='actn-btn' to={`/admin/dashboard/jodi/${data.jodi_id}`}>Jodi</Link></td>
                                            <td><Link className='actn-btn' to={`/admin/dashboard/panel/${data.panel_id}`}>Panel</Link></td>
                                            <td><div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}><button className='actn-btn' onClick={() => handleUnhideGame(data)}><FaEye /></button> </div></td>
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
                    </div>

                ) : null}




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
                    <div className="owner-form-cont">
                        <h1>Select Owner For <span style={{ color: "var(--neon-green)" }}>{selectedGammeForOwner?.gamename.toUpperCase()}</span> </h1>
                        <br /><br />
                        <AutoComplete onSelect={handleOwnerSelect} />
                    </div>
                </Modal>

                <Modal title={"Game Owner Details"} openModal={ownerDetailsModal} setOpenModal={setOwnerDetailsModal} >

                    <div className="owner-details">
                        <img src={ownerDetails?.profilepic} alt="avatar" width={150} height={150} style={{ borderRadius: "8px" }} />
                        <br /><br />
                        <h1>{ownerDetails?.fullname}</h1>
                        <br />
                        <h3><BiLogoGmail /> <a style={{ color: "var(--scclr)" }} href={`mailto:${ownerDetails?.email}`}>{ownerDetails?.email}</a></h3><br />
                        <h3><BiSolidPhoneCall /> <a style={{ color: "var(--scclr)" }} href={`tel:${ownerDetails?.phonenumber}`}> {ownerDetails?.phonenumber}</a></h3>
                    </div>

                </Modal>

                <Modal title={"Set Live"} openModal={liveModal} setOpenModal={setLiveModal}>
                    <div className="formWrap">
                        <div className="form-grid">
                            <div className="form-item">
                                <input type="time" className='cust-input' value={liveFormData.live_start_time} onChange={handleLiveInputChange} name='live_start_time' />
                            </div>
                            <div className="form-item">
                                <input type="time" className='cust-input' value={liveFormData.live_end_time} onChange={handleLiveInputChange} name='live_end_time' />
                            </div>

                            <div className="form-item">
                                <button onClick={handleSaveLiveUpdate}>{isLoading ? <Spinner /> : "Set Live"}</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Games