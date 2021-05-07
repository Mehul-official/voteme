import React from 'react';

export default class Menu extends React.Component {
    constructor() {
        super();
        if (localStorage.userDetails != null && localStorage.userDetails != '') {
            var localdata = JSON.parse(localStorage.userDetails);
            var user_detail = localdata.Data.user;
            this.state = {
                profile_image : user_detail.Image,
                profile_email : user_detail.Email,
                profile_name : user_detail.FirstName + ' ' + user_detail.LastName,
                profile_modal : false,
            };
        }
    }
    toggleProfile() {
        const profileModal = this.state.profile_modal;
        this.setState({ profile_modal: !profileModal });
    }
    logOut() {
        localStorage.clear();
        window.location.href = process.env.REACT_APP_SITE_URL;       
    }
    render() {
        if (localStorage.userDetails != null && localStorage.userDetails != '') {
            return(
                <section style={{display : 'contents'}}>
                    <div className="nav-menu">
                        <div className="toggle">
                            <div className="one"></div>
                            <div className="two"></div>
                            <div className="three"></div>
                        </div>
                    </div>
                    <div className="header-right ng-star-inserted">
                        <div className="header-right-block ng-star-inserted">
                            <div className="h-search">
                                <input type="search" placeholder="Search" className="ng-untouched ng-pristine ng-valid" />
                                <button type="button"><i aria-hidden="true" className="fa fa-search"></i></button>
                            </div>
                            <div className="submit-btn">
                                <button type="button"><a routerlink="/add-query" href="/add-query">Ask your query</a></button>
                            </div>
                            <div className="header-profile">
                                <span className="header-profile-img ng-star-inserted" onClick={() => this.toggleProfile()} style={{backgroundImage: "url('"+this.state.profile_image+"')"}}></span>
                                <div className="profile-dw-inner" style={{display : this.state.profile_modal ? 'block' : 'none'}}>
                                    <div className="dw-img-block flex-box">
                                        <span className="header-profile-img ng-star-inserted" style={{backgroundImage: "url('"+this.state.profile_image+"')"}}></span>
                                        <div className="user-name">{this.state.profile_name}<span className="user-email"><a href="#">{this.state.profile_email}</a></span></div>
                                    </div>
                                    <ul className="dw-list">
                                        <li><a onClick={() => this.logOut()}>Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        } else {
            return(
                <section style={{display : 'contents'}}>
                    <div className="nav-menu">
                        <div className="toggle">
                            <div className="one"></div>
                            <div className="two"></div>
                            <div className="three"></div>
                        </div>
                        <ul className="nav ng-star-inserted">
                            <li className="active">
                                <a href="#home-banner">Home</a>
                            </li>
                            <li>
                                <a href="#about-us">About</a>
                            </li>
                            <li>
                                <a href="#home-banner" className="ng-star-inserted">How it works</a>
                            </li>
                            <li>
                                <a href="#get-in-touch">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="header-right ng-star-inserted">
                        <div className="header-btn-group">
                            <a routerlink="./login" href="/login">Login</a>
                            <a routerlink="./login" href="/login">Sign Up</a>
                        </div>
                    </div>
                </section>
            );
        }
    }
}
