import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../assets/images/home.svg';
import hoverhome from '../../assets/images/hover-home.svg';
import questionmark from '../../assets/images/question-mark.svg';
import hoverquestionmark from '../../assets/images/hover-question-mark.svg';
import manuser from '../../assets/images/man-user.svg';
import hovermanuser from '../../assets/images/hover-man-user.svg';
import termcondition from '../../assets/images/term-condition.svg';
import hovertermcondition from '../../assets/images/hover-term-condition.svg';
import help from '../../assets/images/help.svg';
import hoverhelp from '../../assets/images/hover-help.svg';
import logout from '../../assets/images/logout.svg';
import hoverlogout from '../../assets/images/hover-logout.svg';



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
                                <img src={home.svg} className="sidebar-icon" />
                                <img src={hoverhome.svg} className="sidebar-icon hover-icon" /> Home
                            </Link>
                        </li>
                        <li id="Queries" className="menu-items">
                            <Link onClick={() => this.toggleSubmenu('queries-submenu')}>
                                <img src={questionmark} className="sidebar-icon" />
                                <img src={hoverquestionmark} className="sidebar-icon hover-icon" /> Queries
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
                                <img src={questionmark} className="sidebar-icon" />
                                <img src={hoverquestionmark} className="sidebar-icon hover-icon" /> My Queries
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/profile">
                                <img src={manuser} className="sidebar-icon" />
                                <img src={hovermanuser} className="sidebar-icon hover-icon" /> My Profile
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/terms-and-condition">
                                <img src={termcondition} className="sidebar-icon" />
                                <img src={hovertermcondition} className="sidebar-icon hover-icon" /> Terms &amp; Conditions
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/help">
                                <img src={help} className="sidebar-icon" />
                                <img src={hoverhelp} className="sidebar-icon hover-icon" /> Help
                            </Link>
                        </li>
                        <li className="menu-items">
                            <Link to="/queries" style={{cursor: 'pointer'}}>
                                <img src={logout} className="sidebar-icon" />
                                <img src={hoverlogout} className="sidebar-icon hover-icon" /> Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>    
        )
    }
}