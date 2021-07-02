import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import CheckoutSteps from '../components/CheckoutSteps';

import { savePaymentMethod } from '../redux/actions/cartActions';

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress) {
        history.push('/checkout/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        history.push('/checkout/placeorder');
    };

    return (
        <Col xs={12} md={6}>
            <CheckoutSteps step1 step2 step3 />
            <h3>Payment Method</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Check
                        type="radio"
                        label="Paypal or Credit Card"
                        id="Paypal"
                        name="paymentMethod"
                        value="Paypal"
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    ></Form.Check>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Continue
                </Button>
            </Form>
        </Col>
    );
};

export default PaymentScreen;
