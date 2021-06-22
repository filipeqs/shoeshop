import React from 'react';
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/images/logo.png" className="header__logo" alt="Logo"></img>
            </div>
            <div className="header-mid">
                <a className="header__link text-md" href="/#">
                    Womens
                </a>
                <a className="header__link text-md" href="/#">
                    Mens
                </a>
            </div>
            <div className="header-right">
                <NavLink to="/seach" activeClassName="header__icon-link--active" className="header__icon-link" >
                    <FontAwesomeIcon icon={faSearch} className="header__icon" />
                </NavLink>
                <NavLink to="/login" activeClassName="header__icon-link--active" className="header__icon-link" >
                    <FontAwesomeIcon icon={faUser} className="header__icon" />
                </NavLink>
                <NavLink to="/cart" activeClassName="header__icon-link--active" className="header__icon-link">
                    <FontAwesomeIcon icon={faShoppingBag} className="header__icon" />
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
