import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Form, Button } from 'react-bootstrap';

import { saveShippingAddress } from '../redux/actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [state, setState] = useState(shippingAddress.state || '');
    const [phone, setPhone] = useState(shippingAddress.phone || '');

    useEffect(() => {
        if (!userInfo) history.push('/login');
    });

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country, state, phone }));
        history.push('/checkout/payment');
    };

    return (
        <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 />
            <h3>Shipping Address</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Control
                        type="address"
                        placeholder="Address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="city">
                    <Form.Control
                        type="city"
                        placeholder="City"
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Row>
                    <Form.Group controlId="country" as={Col}>
                        <Form.Control
                            type="country"
                            placeholder="Country"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId="state" as={Col}>
                        <Form.Control
                            type="state"
                            placeholder="State"
                            value={state}
                            required
                            onChange={(e) => setState(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="postalCode">
                    <Form.Control
                        type="postalCode"
                        placeholder="Postal Code"
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="phone">
                    <Form.Control
                        type="phone"
                        placeholder="Phone"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </Col>
    );
};

export default ShippingScreen;
