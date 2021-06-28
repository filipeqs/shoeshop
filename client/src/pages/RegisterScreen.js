import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { register } from '../redux/actions/userActions';

const RegisterScreen = ({ history, location }) => {
    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) history.push(redirect);
    }, [history, userInfo, redirect]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) setMessage('Passwords do not match');
        else {
            setMessage('');
            dispatch(register(name, email, password));
        }
    };

    return (
        <Container className="auth-container">
            <Row className="justfy-content-mid-center">
                <Col xs={12} md={6} className="auth-wrapper">
                    <h1 className="auth__title">Register</h1>
                    {loading && <Loader />}
                    {error && <Message variant="danger">{error}</Message>}
                    {message && <Message variant="danger">{message}</Message>}
                    <Form onSubmit={handleFormSubmit} className="auth__form">
                        <Form.Group controlId="name" className="auth__form-group">
                            <Form.Label hidden>Name</Form.Label>
                            <i className="fas fa-user auth__form-icon"></i>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                className="auth__form-input"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
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
                        <Form.Group controlId="confirmPassword" className="auth__form-group">
                            <Form.Label hidden>Confirm Password</Form.Label>
                            <i className="fas fa-key auth__form-icon"></i>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                className="auth__form-input"
                                value={confirmPassword}
                                required
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button type="submit" variant="primary">
                            Register
                        </Button>

                        <div className="auth__btn-group mt-3">
                            <Link to="/#">Forgot Password?</Link>
                            <Link to="/login">
                                <Button type="button" variant="primary">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterScreen;
