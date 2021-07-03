import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Breadcrumb, ListGroup, Image } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getOrderById } from '../redux/actions/orderActions';

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }

        dispatch(getOrderById(match.params.id));
    }, [dispatch, history, match.params.id, userInfo]);

    return (
        <Fragment>
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/orders">
                    <Breadcrumb.Item href="#">Orders</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Details</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Fragment>
                    <h3>Order Details</h3>
                    <p>
                        Ordered on {order.createdAt && order.createdAt.substring(0, 10)} | Order#{' '}
                        {order._id}
                    </p>
                    <ListGroup>
                        <ListGroup.Item>
                            <Row>
                                <Col md={4}>
                                    <h4>Shipping Address</h4>
                                    <div>{order.user.name}</div>
                                    <div>{order.shippingAddress.address}</div>
                                    <div>
                                        {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                                        {order.shippingAddress.postalCode}
                                    </div>
                                    <div>{order.shippingAddress.country}</div>
                                </Col>
                                <Col md={4}>
                                    <h4>Payment Method</h4>
                                    <div>{order.paymentMethod}</div>
                                </Col>
                                <Col md={4}>
                                    <h4>Order Summary</h4>
                                    <div>
                                        Subtotal:
                                        <span className="float-right">${order.subtotal}</span>
                                    </div>
                                    <div>
                                        Shipping & Handling:
                                        <span className="float-right">${order.shippingPrice}</span>
                                    </div>
                                    <div>
                                        Tax:
                                        <span className="float-right">${order.taxPrice}</span>
                                    </div>
                                    <div>
                                        Total:
                                        <span className="float-right">${order.totalPrice}</span>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup className="mt-4">
                        {order.orderItems.map((orderItem) => (
                            <ListGroup.Item key={orderItem._id}>
                                <Row>
                                    <Col md={2}>
                                        <Link to={`/product/${orderItem.productId}`}>
                                            <Image
                                                src={orderItem.image}
                                                alt={orderItem.name}
                                                fluid
                                                className="bg-whitesmoke"
                                            />
                                        </Link>
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/product/${orderItem.productId}`}>
                                            <h4>{orderItem.name}</h4>
                                        </Link>
                                        <div>Size: {orderItem.size}</div>
                                        <div>${orderItem.price}</div>
                                    </Col>
                                    <Col md={4}>Buttons</Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderScreen;
