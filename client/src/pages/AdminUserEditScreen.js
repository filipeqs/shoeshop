import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

import { getUserDetails, updateUser } from '../redux/actions/userActions';
import ProfileForm from './ProfileForm';

const AdminUserEditScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const userId = match.params.id;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(getUserDetails(userId));
    }, [dispatch, userInfo, userId, history]);

    const submitHandler = (user) => {
        dispatch(
            updateUser(
                {
                    name: user.name,
                    email: user.email,
                    password: user.password,
                },
                userId,
            ),
        );
    };

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin">
                    <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin/userlist">
                    <Breadcrumb.Item href="#">Users</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Edit</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Col md={{ span: 6, offset: 3 }}>
                    <h3>Edit User</h3>

                    <AlertMessage />
                    <ProfileForm user={user} submitHandler={submitHandler} />
                </Col>
            )}
        </Container>
    );
};

export default AdminUserEditScreen;
