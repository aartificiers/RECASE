import React from 'react';
import "./footer.scss";
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className='Footer glass brdr-rod'>
        <div className="FooterWrap">

            <div className="footer-left">
                <h4>© 2011 - 2023 srboss.com</h4>

            </div>
            <div className="footer-right">
                <div className="footerLinks">
                    <Link to={"/home"}>Home</Link>|
                    <Link to={"/home/about"}>About us</Link>|
                    <Link to={"/home/contact"}>Contact us </Link>|
                    <Link to={"/home/privacy"}>Privacy & Policy </Link>|
                    <Link to={"#"}>Term & Condition</Link>|
                    <Link to={"#"}>Sitemap</Link>
                </div>
            </div>

        </div>
    </div>
  )
}
