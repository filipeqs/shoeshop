import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';

import { listOrders } from '../redux/actions/orderActions';
import Order from '../components/Order';

const AdminOrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(listOrders());
    }, [dispatch, history, userInfo]);

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin">
                    <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>All Orders</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Fragment>
                    <h3>All Orders</h3>
                    {orders.length === 0 ? (
                        <Message>
                            No orders <Link to="/">Go Back</Link>
                        </Message>
                    ) : (
                        orders.map((order) => <Order key={order._id} order={order} />)
                    )}
                </Fragment>
            )}
        </Container>
    );
};

export default AdminOrderListScreen;
