import React from 'react';

export default class SideMenu extends React.Component {
    constructor() {
        super();
        this.state = {
            submenu : '',
            submenuIsActive : ''
        }
    }
    toggleSubmenu(subMenuClass) {
        const submenuIsActive = this.state.submenuIsActive;
        this.setState({
            submenu: subMenuClass,
            submenuIsActive: !submenuIsActive
        });
    }

    render() {
        return(
            <div className="left-sidebar">
                <div className="sidebar-inner">
                    <ul>
                        <li className="menu-items active">
                            <a routerlink="/queries" href="/queries">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/home.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-home.svg'} className="sidebar-icon hover-icon" /> Home
                            </a>
                        </li>
                        <li id="Queries" className="menu-items">
                            <a onClick={() => this.toggleSubmenu('queries-submenu')}>
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/question-mark.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-question-mark.svg'} className="sidebar-icon hover-icon" /> Queries
                            </a>
                            <ul className="sidebar-submenu ng-star-inserted queries-submenu" style={{display : this.state.submenuIsActive && this.state.submenu == 'queries-submenu' ? 'block' : 'none'}}>
                                <li><a href="/queries/recent">Recent Queries</a></li>
                                <li><a href="/queries/top10">Top 10 Queries</a></li>
                                <li><a href="/queries/popular">Popular Queries</a></li>
                                <li><a href="/queries/general">All Queries</a></li>
                            </ul>
                        </li>
                        <li className="menu-items">
                            <a href="/my-query">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/question-mark.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-question-mark.svg'} className="sidebar-icon hover-icon" /> My Queries
                            </a>
                        </li>
                        <li className="menu-items">
                            <a href="/profile">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/man-user.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-man-user.svg'} className="sidebar-icon hover-icon" /> My Profile
                            </a>
                        </li>
                        <li className="menu-items">
                            <a href="/terms-and-condition">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/term-condition.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-term-condition.svg'} className="sidebar-icon hover-icon" /> Terms &amp; Conditions
                            </a>
                        </li>
                        <li className="menu-items">
                            <a href="/help">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/help.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-help.svg'} className="sidebar-icon hover-icon" /> Help
                            </a>
                        </li>
                        <li className="menu-items">
                            <a style={{cursor: 'pointer'}} href="/queries">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/logout.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-logout.svg'} className="sidebar-icon hover-icon" /> Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>    
        )
    }
}