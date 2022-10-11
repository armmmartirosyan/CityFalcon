import React from 'react';
import {Link} from "react-router-dom";
import logo from "../assets/images/logo-1366.svg";
import user from "../assets/images/avatar.jpg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons";

function Header() {
    return (
        <header className='header'>
            <div className="container">
                <figure className="header__logo">
                    <Link to='/' className='header__logo__link'>
                        <img src={logo} alt="Logo" className='header__logo__img'/>
                    </Link>
                </figure>
                <figure className="header__user">
                    <img src={user} alt="User" className="header__user__img"/>
                    <figcaption className="header__user__cap">
                        <FontAwesomeIcon icon={faCaretDown} className='header__user__angle'/>
                    </figcaption>
                </figure>
            </div>
        </header>
    );
}

export default Header;