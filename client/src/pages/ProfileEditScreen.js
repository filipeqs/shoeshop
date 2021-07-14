import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import AlertMessage from '../components/AlertMessage';

import { getUserDetails, updateUserProfileDetails } from '../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';
import ProfileForm from './ProfileForm';

const ProfileEditScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success: successUpdate, error: errorUpdate } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (successUpdate) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(getUserDetails('profile'));
        } else dispatch(getUserDetails('profile'));
    }, [dispatch, history, userInfo, successUpdate]);

    const submitHandler = (user) => {
        dispatch(
            updateUserProfileDetails({
                name: user.name,
                email: user.email,
                password: user.password,
            }),
        );
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
                    <h3>Edit Profile</h3>
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

                    <AlertMessage />
                    <ProfileForm user={user} submitHandler={submitHandler} />
                </Col>
            )}
        </Container>
    );
};

export default ProfileEditScreen;
