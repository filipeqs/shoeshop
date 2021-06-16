import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <img src="/images/logo.svg" className="header-logo" alt="Logo"></img>
            </div>
            <div className="header-mid">
                <a className="header-link text-md" href="/#">
                    Womens
                </a>
                <a className="header-link text-md" href="/#">
                    Mens
                </a>
            </div>
            <div className="header-right">
                <FontAwesomeIcon icon={faSearch} className="header-icon" />
                <FontAwesomeIcon icon={faUser} className="header-icon" />
                <FontAwesomeIcon icon={faShoppingBag} className="header-icon" />
            </div>
        </header>
    );
};

export default Header;
