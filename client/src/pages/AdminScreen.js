import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import CardLink from '../components/CardLink';

const AdminScreen = ({ history }) => {
    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
    }, [userInfo, history]);

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Admin</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <CardLink
                    link={`/admin/userlist`}
                    icon="fas fa-users"
                    tite="Users"
                    text="View, edit and add users"
                />
                <CardLink
                    link={`/admin/productlist`}
                    icon="fas fa-shoe-prints"
                    tite="Products"
                    text="View, edit and add products"
                />
                <CardLink
                    link={`/admin/orderlist`}
                    icon="fas fa-box-open"
                    tite="Orders"
                    text="View and edit orders"
                />
            </Row>
        </Container>
    );
};

export default AdminScreen;
