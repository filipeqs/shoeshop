import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

import { logout } from '../redux/actions/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userInfoIcon = userInfo && (
        <span>
            <i className="fas fa-user"></i> {userInfo.name}
        </span>
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <header>
            <Navbar bg="light" variant="light" expand="lg" fixed="top" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src="/images/logo.png" alt="Logo" />
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <NavDropdown title="brand" id="brand">
                                <LinkContainer to="/product/brand/adidas">
                                    <NavDropdown.Item>Adidas</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/product/brand/all-star">
                                    <NavDropdown.Item>All Star</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/product/brand/fila">
                                    <NavDropdown.Item>Fila</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/product/brand/new-balance">
                                    <NavDropdown.Item>New Balance</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/product/brand/nike">
                                    <NavDropdown.Item>Nike</NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/product/brand/puma">
                                    <NavDropdown.Item>Puma</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        </Nav>

                        <Nav className="ml-auto">
                            {userInfo && userInfo.isAdmin && (
                                <LinkContainer to="/admin">
                                    <Nav.Link>
                                        <i className="fas fa-user-shield"></i> Admin
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo ? (
                                <NavDropdown title={userInfoIcon} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Porfile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/orders">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>
                                        <i className="fas fa-user"></i> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            <LinkContainer to="/cart">
                                <Nav.Link>
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
