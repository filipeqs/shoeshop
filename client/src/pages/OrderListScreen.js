import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Breadcrumb, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { listMyOrders } from '../redux/actions/orderActions';
import Order from '../components/Order';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else dispatch(listMyOrders());
    }, [dispatch, history, userInfo]);

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/profile">
                    <Breadcrumb.Item href="#">Profile</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Orders</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Fragment>
                    <h3>Your Orders</h3>
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

export default OrderListScreen;
