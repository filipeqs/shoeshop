import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { login } from '../redux/actions/userActions';

const LoginScreen = ({ history, location }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) history.push(redirect);
    }, [history, userInfo, redirect]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Container className="auth-container">
            <Row className="justfy-content-mid-center">
                <Col xs={12} md={6} className="auth-wrapper">
                    <h2>Sign In</h2>
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    <Form onSubmit={handleFormSubmit} className="auth__form">
                        <Form.Group controlId="email" className="auth__form-group">
                            <Form.Label hidden>Email Address</Form.Label>
                            <i className="fas fa-envelope auth__form-icon"></i>
                            <Form.Control
                                type="email"
                                placeholder="Enter Email"
                                className="auth__form-input"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password" className="auth__form-group">
                            <Form.Label hidden>Password</Form.Label>
                            <i className="fas fa-key auth__form-icon"></i>
                            <Form.Control
                                type="password"
                                placeholder="Enter Password"
                                className="auth__form-input"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="dark">
                            Sign In
                        </Button>

                        <div className="auth__btn-group mt-3">
                            <Link to="/#">Forgot Password?</Link>
                            <Link to="/register">
                                <Button type="button" variant="dark">
                                    Register
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginScreen;
