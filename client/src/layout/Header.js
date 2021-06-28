import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { logout } from '../redux/actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src="/images/logo.png" alt="Logo" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                    className="header__link"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item className="header__link">
                                            Porfile
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item
                                        className="header__link"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link className="header__link">
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                            <LinkContainer to="/cart">
                                <Nav.Link className="header__link">
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
