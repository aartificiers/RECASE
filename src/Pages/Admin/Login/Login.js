import React, { useState } from 'react';
import './login.scss';
import { API } from '../../../Services/Api';
import { getCookie } from '../../../Utils/commonutil';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../../../Store/Slices/userSlice';
import Loader from '../../../Components/Loader/Loader';

const initialLoginData = { username: "", password: "" };
const Login = () => {
    const [formData, setFormData] = useState(initialLoginData);
    const userinfo = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setFormData((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }

    const handleSubmit = async () => {
        setLoading(true);
        const response = await API.subAdminLog(formData);
        if (response.isSuccess) {
            toast.success(`Welcome Back ${response.data.data.name}`, {
                
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setLoading(false);
            setFormData(initialLoginData);
            dispatch(addUser({ isAuthenticated: true, user: response.data.data }));
            if(response.data.data.role==='BENJO'){
                navigate("/admin/dashboard/dash");
            }else{
                navigate("/admin/dashboard/games");
            }
        } else {
            setLoading(false);
            toast.error(response.errormsg,{
                
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (

        <div className={"login"}>
            <div className={"loginWrap"}>
                <div className={"box"}>
                    <div className={"boxWrap"}>

                        <div className={"boxLeft" + " glass"}>
                            <div className={"boxLeftWrap"}>
                                <h2 className={"boxHeading"}>SR BOSS</h2>
                                <h2>Log in to your account</h2>
                                <h3>Don't have an account? <span><a href="#">Contact Us</a></span></h3>

                                <div className={"inputWrap"}>

                                    <div className={"custRow"}>
                                        <input name='username' id='username' onChange={handleInputChange} value={formData.username} type="text" placeholder='User Name' className={"inputs"} />
                                        <input name='password' id='password' onChange={handleInputChange} value={formData.password} type="password" placeholder='Password' className={"inputs"} />
                                        <button onClick={handleSubmit} value="Submit" className={"submit"}>{loading ? <Loader /> : 'Submit'}</button>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className={"boxRight"}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login