import React from 'react';
import { Link } from 'react-router-dom';

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
                            <Link to="/queries">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/home.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-home.svg'} className="sidebar-icon hover-icon" /> Home
                            </Link>
                        </li>
                        <li id="Queries" className="menu-items">
                            <Link onClick={() => this.toggleSubmenu('queries-submenu')}>
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/question-mark.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-question-mark.svg'} className="sidebar-icon hover-icon" /> Queries
                            </Link>
                            <ul className="sidebar-submenu ng-star-inserted queries-submenu" style={{display : this.state.submenuIsActive && this.state.submenu == 'queries-submenu' ? 'block' : 'none'}}>
                                <li><Link to="/queries/recent">Recent Queries</Link></li>
                                <li><Link to="/queries/top10">Top 10 Queries</Link></li>
                                <li><Link to="/queries/popular">Popular Queries</Link></li>
                                <li><Link to="/queries/general">All Queries</Link></li>
                            </ul>
                        </li>
                        <li className="menu-items">
                            <Link to="/my-query">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/question-mark.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-question-mark.svg'} className="sidebar-icon hover-icon" /> My Queries
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/profile">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/man-user.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-man-user.svg'} className="sidebar-icon hover-icon" /> My Profile
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/terms-and-condition">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/term-condition.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-term-condition.svg'} className="sidebar-icon hover-icon" /> Terms &amp; Conditions
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/help">
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/help.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-help.svg'} className="sidebar-icon hover-icon" /> Help
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/queries" style={{cursor: 'pointer'}}>
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/logout.svg'} className="sidebar-icon" />
                                <img src={process.env.REACT_APP_BASE_URL + '/src/assets/images/hover-logout.svg'} className="sidebar-icon hover-icon" /> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>    
        )
    }
}