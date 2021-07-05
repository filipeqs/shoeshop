import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, Breadcrumb, ListGroup, Button } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getOrderById, payOrder, deliverOrder } from '../redux/actions/orderActions';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../redux/constants/orderConstants';
import OrderItemDetails from '../components/OrderItemDetails';

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);

    const { userInfo } = useSelector((state) => state.userLogin);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { success: successPay, loading: loadingPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { success: successDeliver, loading: loadingDeliver } = orderDeliver;

    const addPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/config/paypal');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!window.paypal) addPayPalScript();
            else setSdkReady(true);

            dispatch(getOrderById(match.params.id));

            return () => {
                dispatch({ type: ORDER_PAY_RESET });
                dispatch({ type: ORDER_DELIVER_RESET });
            };
        }
    }, [dispatch, history, match.params.id, userInfo, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(match.params.id, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

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
                                    {order.isDelivered ? (
                                        <Message variant="success">
                                            Delivered on {order.deliveredAt}
                                        </Message>
                                    ) : (
                                        <Message variant="danger">Not Delivered</Message>
                                    )}
                                </Col>
                                <Col md={4}>
                                    <h4>Payment Method</h4>
                                    <div>{order.paymentMethod}</div>
                                    {order.isPaid ? (
                                        <Message variant="success">Paid on {order.paidAt}</Message>
                                    ) : (
                                        <Message variant="danger">Not Paid</Message>
                                    )}
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
                            <OrderItemDetails
                                key={orderItem._id}
                                orderItem={orderItem}
                                isDelivered={order.isDelivered}
                            />
                        ))}
                    </ListGroup>

                    {!order.isPaid && (
                        <Row className="mt-4">
                            <Col md={{ span: 4, offset: 8 }}>
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            </Col>
                        </Row>
                    )}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <Row className="mt-4">
                            <Col md={{ span: 4, offset: 8 }}>
                                <ListGroup.Item>
                                    {loadingDeliver && <Loader />}
                                    <Button
                                        type="button"
                                        className="btn btn-block"
                                        disabled={loadingDeliver}
                                        onClick={deliverHandler}
                                    >
                                        Mark as Delivered
                                    </Button>
                                </ListGroup.Item>
                            </Col>
                        </Row>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderScreen;
