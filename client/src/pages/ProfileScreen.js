import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, Container, Row, Col, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

const ProfileScreen = ({ history }) => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) history.push('/login');
    }, [userInfo, history]);

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Profile</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={4}>
                    <Link to={`/profile/edit/${userInfo._id}`} className="profile-card__link">
                        <Card className="profile-card">
                            <i className="fas fa-shield-alt profile-card__icon"></i>
                            <Card.Body>
                                <Card.Title>Login & Security</Card.Title>
                                <Card.Text>Edit email, name and password</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to="/orders" className="profile-card__link">
                        <Card className="profile-card">
                            <i className="fas fa-box-open profile-card__icon"></i>
                            <Card.Body>
                                <Card.Title>Orders</Card.Title>
                                <Card.Text>Track orders</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileScreen;
