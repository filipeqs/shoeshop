import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Order from '../components/Order';
import Paginate from '../components/Paginate';

import { listOrders } from '../redux/actions/orderActions';

const AdminOrderListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const pageNumber = match.params.pageNumber || 1;

    const { userInfo } = useSelector((state) => state.userLogin);

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(listOrders(pageNumber));
    }, [dispatch, history, userInfo, pageNumber]);

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
                            No orders <Link to="/admin">Go Back</Link>
                        </Message>
                    ) : (
                        <Fragment>
                            {orders.map((order) => (
                                <Order key={order._id} order={order} />
                            ))}
                            <Paginate page={page} pages={pages} link={'/admin/orderlist'} />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Container>
    );
};

export default AdminOrderListScreen;
