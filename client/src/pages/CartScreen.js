import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import compose from 'lodash/fp/compose';

import Message from '../components/Message';

import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const CartScreen = ({ history }) => {
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);

    const handleMinusQty = (selectedId) => {
        const productToEdit = cartItems.find((item) => item.selectedId === selectedId);
        productToEdit.qty = productToEdit.qty > 1 ? productToEdit.qty - 1 : productToEdit.qty;

        dispatch(addToCart(productToEdit));
    };

    const handleAddQty = (selectedId) => {
        const productToEdit = cartItems.find((item) => item.selectedId === selectedId);
        productToEdit.qty =
            productToEdit.qty !== productToEdit.count ? productToEdit.qty + 1 : productToEdit.qty;

        dispatch(addToCart(productToEdit));
    };

    const handleRemoveFromCart = (selectedId) => {
        dispatch(removeFromCart(selectedId));
    };

    const fixed = (number) => number.toFixed(2);

    const getSubTotal = (qty, price) => Number(qty) * Number(price);

    const getSubTotalFixed = compose([fixed, getSubTotal]);

    const getTotal = () =>
        cartItems.reduce((acc, cartItem) => cartItem.qty * cartItem.price + acc, 0);

    const getTotalFixed = compose([fixed, getTotal]);

    const handleCheckout = () => {
        history.push('/login?redirect=checkout/shipping');
    };

    return (
        <Fragment>
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Cart</Breadcrumb.Item>
            </Breadcrumb>

            {cartItems.length === 0 ? (
                <Message>
                    Your cart is empty <Link to="/">Go Back</Link>
                </Message>
            ) : (
                <Fragment>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Item</Col>
                            <Col md={4} className="text-center">
                                Quanty
                            </Col>
                            <Col md={2} className="text-center">
                                Subtotal
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {cartItems.map((cartItem) => (
                        <ListGroup.Item key={cartItem.productId}>
                            <Row className="cart__item">
                                <Col md={2}>
                                    <Link to={`/product/${cartItem.productId}`}>
                                        <Image src={cartItem.image} alt={cartItem.name} fluid />
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    <h4>{cartItem.name}</h4>
                                    <div>Size: {cartItem.size}</div>
                                    <div>${cartItem.price}</div>
                                </Col>
                                <Col md={4} className="text-center">
                                    <div className="cart__edit-container">
                                        <span
                                            className="cart__edit"
                                            onClick={() => handleMinusQty(cartItem.selectedId)}
                                        >
                                            -
                                        </span>
                                        <span className="cart__edit-qty">{cartItem.qty}</span>
                                        <span
                                            className="cart__edit"
                                            onClick={() => handleAddQty(cartItem.selectedId)}
                                        >
                                            +
                                        </span>
                                    </div>
                                    <button
                                        className="cart__edit-remove btn"
                                        onClick={() => handleRemoveFromCart(cartItem.selectedId)}
                                    >
                                        Remove
                                    </button>
                                </Col>
                                <Col md={2} className="text-center">
                                    ${getSubTotalFixed(cartItem.qty, cartItem.price)}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item variant="flush">
                        <Row>
                            <Col md={8}>
                                <Link to="/" className="cart__link">
                                    Continue shopping
                                </Link>
                            </Col>
                            <Col md={2}>
                                <h4 className="margin-none">Total</h4>
                            </Col>
                            <Col md={2} className="text-center margin-none">
                                <h4 className="margin-none">${getTotalFixed()}</h4>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <Button variant="dark" className="float-right mt-4" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Fragment>
            )}
        </Fragment>
    );
};

export default CartScreen;
