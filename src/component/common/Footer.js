import React from 'react';
import Copyright from './Copyright';
import logowhite from '../../assets/images/logo_white.png';
export default class Header extends React.Component {
    render() {
        return(
            <footer>
                <div className="footer-inr">
                    <div className="container">
                        <div className="f-col f-col-1"><img src={logowhite} /><span className="f-disc">Solve your any type of queries by asking and also help others by voting their queries.</span></div>
                        <div className="f-col f-col-2">
                            <h5 className="ftr-title">Quick Links</h5>
                            <ul>
                                <li><a href="#home-banner">Home</a></li>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#how-it-works">My Queries</a></li>
                                <li><a href="#about-us">About Us</a></li>
                                <li><a href="#get-in-touch">Contact</a></li>
                            </ul>
                        </div>
                        <div className="f-col f-col-3">
                            <h5 className="ftr-title">Contact Us</h5>
                            <div className="f-add">D-703, Ganesh Meridian, <br />Sarkhej – Gandhinagar Hwy, <br />opp. Amiraj Farm, <br />Sola, Ahmedabad, <br />Gujarat 380060</div>
                            <div className="f-call"><a href="tel:+079-40396835">+079-40396835</a></div>
                            <div className="f-email"><a href="mailto:info@voteme.com">info@voteme.com</a></div>
                        </div>
                    </div>
                </div>
                <Copyright />
            </footer> 
        )
    }
}