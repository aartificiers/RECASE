import React from 'react';
import './contactpage.scss';
import Navbar from '../../../Components/Navbar/Navbar';

const Contactpage = () => {
    return (
        <div className="main dark">
            <div className="mainWrap">
                <Navbar/>
                <div className={'contactSection' + " glass brdr-rad "}>
                    <div className={'contactWrap'}>
                        <div className={'contHeading'}>
                            <h1>Contact Details</h1>
                        </div>
                        <form action="">



                        </form>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Contactpage