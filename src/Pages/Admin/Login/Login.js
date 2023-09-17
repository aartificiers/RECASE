import React from 'react';
import './login.scss';

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
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
        const response = await API.subAdminLog(formData);
        if(response.isSuccess){
            console.log(response.data);
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
                                            <input name='username' onChange={handleInputChange} type="text" placeholder='User Name' className={"inputs"} />
                                            <input name='password' onChange={handleInputChange} type="text" placeholder='Password' className={"inputs"} />
                                            <button onClick={handleSubmit} value="Submit" className={"submit"}>Submit</button>
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