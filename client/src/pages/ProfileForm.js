import React, { Fragment, useState } from 'react';
import { Row, Col, ListGroup, Button, Accordion, Form } from 'react-bootstrap';

import Message from '../components/Message';

const ProfileForm = ({ user, submitHandler }) => {
    const [name, setName] = useState(user ? user.name : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) setMessage('Passwords do not match');
        else {
            setMessage('');
            submitHandler({ name, email, password });
        }
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            {message && <Message variant="danger">{message}</Message>}
            <ListGroup>
                <ListGroup.Item>
                    <Accordion>
                        <Row>
                            <Col md={10}>
                                <h5>Name</h5>
                                <div>{user.name}</div>
                            </Col>
                            <Col md={2} className="d-flex align-items-center">
                                <Accordion.Toggle as={Button} className="btn-sm" eventKey="0">
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
                                <Accordion.Toggle as={Button} className="btn-sm" eventKey="0">
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
                                <Accordion.Toggle as={Button} className="btn-sm" eventKey="0">
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
                                                onChange={(e) => setPassword(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="confirmPassword">
                                            <Form.Control
                                                type="password"
                                                placeholder="Corm password"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
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
    );
};

export default ProfileForm;
