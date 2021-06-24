import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { logout } from '../redux/actions/userActions'

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleLogout = () => {
        dispatch(logout());
    }

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
                <NavLink to="/seach" activeClassName="header__icon-link--active" className="header__icon-link" title="Search" >
                    <FontAwesomeIcon icon={faSearch} className="header__icon" />
                </NavLink>
                {userInfo ? 
                    <div className="header__icon-link" onClick={handleLogout} title="Logout" >
                        <FontAwesomeIcon icon={faSignOutAlt} className="header__icon" />
                    </div>
                    : <NavLink to="/login" activeClassName="header__icon-link--active" className="header__icon-link" title="Login" >
                        <FontAwesomeIcon icon={faUser} className="header__icon" />
                    </NavLink>
                }
                <NavLink to="/cart" activeClassName="header__icon-link--active" className="header__icon-link" title="Cart" >
                    <FontAwesomeIcon icon={faShoppingBag} className="header__icon" />
                </NavLink>
            </div>
        </header>
    );
};

export default Header;
