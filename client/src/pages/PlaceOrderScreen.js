import React, { useEffect } from 'react';
import { Button, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

import { createOrder } from '../redux/actions/orderActions';
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants';

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    // Calculate Prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };
    cart.subtotal = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
    );
    cart.shippingPrice = addDecimals(cart.subtotal > 100 ? 0 : 100);
    cart.taxPrice = addDecimals(Number((0.15 * cart.subtotal).toFixed(2)));
    cart.totalPrice = (
        Number(cart.subtotal) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
        return () => {
            dispatch({ type: ORDER_CREATE_RESET });
        };
        // eslint-disable-next-line
    }, [history, success, dispatch]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                subtotal: cart.subtotal,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }),
        );
    };

    return (
        <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 step3 step4 />
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city},{' '}
                        {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                    <p>
                        <strong>Phone: </strong>
                        {cart.shippingAddress.phone}
                    </p>
                </ListGroup.Item>

                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>

                {error && (
                    <ListGroup.Item>
                        <Message variant="danger">{error}</Message>
                    </ListGroup.Item>
                )}

                <ListGroup.Item>
                    <Button
                        type="button"
                        className="btn-block"
                        disabled={cart.cartItem === 0}
                        onClick={placeOrderHandler}
                    >
                        Place Order
                    </Button>
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
};

export default PlaceOrderScreen;
