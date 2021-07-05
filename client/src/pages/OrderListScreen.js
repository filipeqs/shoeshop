import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Breadcrumb, ListGroup, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { listMyOrders } from '../redux/actions/orderActions';
import OrderItemDetails from '../components/OrderItemDetails';

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
        <Fragment>
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
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
                        orders.map((order) => (
                            <ListGroup key={order._id} className="mt-4">
                                <ListGroup.Item className="bg-whitesmoke">
                                    <Row>
                                        <Col md={3}>
                                            <h5>Order Placed</h5>
                                            <div>{order.createdAt.substring(0, 10)}</div>
                                        </Col>
                                        <Col md={3}>
                                            <h5>Total</h5>
                                            <div>${order.totalPrice}</div>
                                        </Col>
                                        <Col md={6} className="float-right">
                                            <div className="float-right">
                                                <h5>Order# {order._id}</h5>
                                                <Link to={`/orders/${order._id}`}>
                                                    View order details
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {order.orderItems.map((orderItem) => (
                                    <OrderItemDetails
                                        key={orderItem._id}
                                        orderItem={orderItem}
                                        isDelivered={order.isDelivered}
                                    />
                                ))}
                            </ListGroup>
                        ))
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderListScreen;
