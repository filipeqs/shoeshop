import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListGroup, Row, Col } from 'react-bootstrap';

import OrderItemDetails from './OrderItemDetails';

const Order = ({ order }) => {
    return (
        <ListGroup className="mt-4">
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
                    <Col md={3}>
                        {order.user.name && (
                            <Fragment>
                                <h5>User</h5>
                                <div>{order.user.name}</div>
                            </Fragment>
                        )}
                    </Col>
                    <Col md={3} className="float-right">
                        <div className="float-right">
                            <h5>Order# {order._id}</h5>
                            <Link to={`/orders/${order._id}`}>View order details</Link>
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
    );
};

export default Order;
