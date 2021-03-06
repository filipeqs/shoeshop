import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CardLink from '../components/CardLink';

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
                <CardLink
                    link={`/profile/edit`}
                    icon="fas fa-shield-alt"
                    tite="Login & Security"
                    text="Edit email, name and password"
                />
                <CardLink
                    link={`/orders`}
                    icon="fas fa-box-open"
                    tite="Orders"
                    text="Track orders"
                />
            </Row>
        </Container>
    );
};

export default ProfileScreen;
