import React from 'react';
import { Link } from 'react-router-dom';

import Menu from './Menu';
import '../../assets/css/style.css';
import '../../assets/css/font-awesome.css';
import logo from '../../assets/images/logo.png';
export default class Header extends React.Component {
    render() {
        return(
            <header>
                <div className="container">
                    <div className="header-inner">
                        <div className="logo">
                            <Link style={{cursor: 'pointer'}} to='/queries'>
                                <img alt="smile" src={logo} />
                            </Link>
                        </div>
                        <Menu />
                    </div>
                </div>
            </header>
        );
    }
}