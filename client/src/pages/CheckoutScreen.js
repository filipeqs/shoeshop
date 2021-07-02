import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Col, ListGroup, Image, Row, Container } from 'react-bootstrap';
import compose from 'lodash/fp/compose';

import ShippingScreen from './ShippingScreen';
import PaymentScreen from './PaymentScreen';

const CheckoutScreen = ({ match }) => {
    const { cartItems } = useSelector((state) => state.cart);

    const fixed = (number) => number.toFixed(2);

    const getSubTotal = () =>
        cartItems.reduce((acc, cartItem) => cartItem.qty * cartItem.price + acc, 0);

    const getSubTotalFixed = compose([fixed, getSubTotal]);

    return (
        <Row className="wrapper">
            <Route path={`${match.path}/shipping`} component={ShippingScreen} />
            <Route path={`${match.path}/payment`} component={PaymentScreen} />
            <Col xs={12} md={6} className="bg-whitesmoke border-r border-l">
                <Container>
                    <ListGroup variant="flush">
                        {cartItems.map((cartItem) => (
                            <ListGroup.Item key={cartItem._id} className="bg-whitesmoke">
                                <Row>
                                    <Col md={4}>
                                        <Image src={cartItem.image} alt={cartItem.name} fluid />
                                    </Col>
                                    <Col md={4}>
                                        <h4>{cartItem.name}</h4>
                                        <div>Size: {cartItem.size}</div>
                                    </Col>
                                    <Col
                                        md={4}
                                        className="d-flex align-items-center justify-content-end"
                                    >
                                        ${cartItem.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item className="bg-whitesmoke">
                            <Row>
                                <Col md={4}>Subtotal</Col>
                                <Col
                                    md={8}
                                    className="d-flex align-items-center justify-content-end"
                                >
                                    ${getSubTotalFixed()}
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>Shipping</Col>
                                <Col
                                    md={8}
                                    className="d-flex align-items-center justify-content-end"
                                >
                                    Calculated at next step
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="bg-whitesmoke">
                            <Row>
                                <Col md={4}>
                                    <h4>Total</h4>
                                </Col>
                                <Col
                                    md={8}
                                    className="d-flex align-items-center justify-content-end"
                                >
                                    <h4>Subtotal + Tax</h4>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </Col>
        </Row>
    );
};

export default CheckoutScreen;
