import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Breadcrumb,
    Container,
    Row,
    Col,
    ListGroup,
    Button,
    Accordion,
    Form,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

import { getUserDetails, updateUserProfileDetails } from '../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';

const EditProfileScreen = ({ history }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else {
            if (!user || !user.name || successUpdate) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, history, userInfo, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) setMessage('Passwords do not match');
        else {
            setMessage('');
            dispatch(updateUserProfileDetails({ id: user._id, name, email, password }));
        }
    };

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/profile">
                    <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Col md={{ span: 6, offset: 3 }}>
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    {message && <Message variant="danger">{message}</Message>}
                    <AlertMessage />
                    <Form onSubmit={submitHandler}>
                        <ListGroup>
                            <ListGroup.Item>
                                <Accordion>
                                    <Row>
                                        <Col md={10}>
                                            <h5>Name</h5>
                                            <div>{user.name}</div>
                                        </Col>
                                        <Col md={2} className="d-flex align-items-center">
                                            <Accordion.Toggle
                                                as={Button}
                                                className="btn-sm"
                                                eventKey="0"
                                            >
                                                Edit
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-2">
                                            <Accordion.Collapse eventKey="0">
                                                <Form.Group controlId="name">
                                                    <Form.Control
                                                        type="name"
                                                        placeholder="Enter Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Accordion.Collapse>
                                        </Col>
                                    </Row>
                                </Accordion>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Accordion>
                                    <Row>
                                        <Col md={10}>
                                            <h5>Email</h5>
                                            <div>{user.email}</div>
                                        </Col>
                                        <Col md={2} className="d-flex align-items-center">
                                            <Accordion.Toggle
                                                as={Button}
                                                className="btn-sm"
                                                eventKey="0"
                                            >
                                                Edit
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-2">
                                            <Accordion.Collapse eventKey="0">
                                                <Form.Group controlId="email">
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="Enter Email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>
                                            </Accordion.Collapse>
                                        </Col>
                                    </Row>
                                </Accordion>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Accordion>
                                    <Row>
                                        <Col md={10}>
                                            <h5>Password</h5>
                                            <div>******</div>
                                        </Col>
                                        <Col md={2} className="d-flex align-items-center">
                                            <Accordion.Toggle
                                                as={Button}
                                                className="btn-sm"
                                                eventKey="0"
                                            >
                                                Edit
                                            </Accordion.Toggle>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} className="mt-2">
                                            <Accordion.Collapse eventKey="0">
                                                <Fragment>
                                                    <Form.Group controlId="password">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Enter Password"
                                                            value={password}
                                                            onChange={(e) =>
                                                                setPassword(e.target.value)
                                                            }
                                                        ></Form.Control>
                                                    </Form.Group>
                                                    <Form.Group controlId="confirmPassword">
                                                        <Form.Control
                                                            type="password"
                                                            placeholder="Corm password"
                                                            value={confirmPassword}
                                                            onChange={(e) =>
                                                                setConfirmPassword(e.target.value)
                                                            }
                                                        ></Form.Control>
                                                    </Form.Group>
                                                </Fragment>
                                            </Accordion.Collapse>
                                        </Col>
                                    </Row>
                                </Accordion>
                            </ListGroup.Item>
                        </ListGroup>
                        <Button type="submit" className="mt-2">
                            Update
                        </Button>
                    </Form>
                </Col>
            )}
        </Container>
    );
};

export default EditProfileScreen;
