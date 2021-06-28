import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ListGroup, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Message from '../components/Message';

import { addToCart, removeFromCart } from '../redux/actions/cartActions';

const CartScreen = () => {
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

    return (
        <Row>
            <Col md={12}>
                <h1>Shopping Cart</h1>
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
                            <ListGroup.Item key={cartItem._id}>
                                <Row className="cart__item">
                                    <Col md={2}>
                                        <Link to={`/product/${cartItem._id}`}>
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
                                            onClick={() =>
                                                handleRemoveFromCart(cartItem.selectedId)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </Col>
                                    <Col md={2} className="text-center">
                                        ${Number(cartItem.qty) * Number(cartItem.price)}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup variant="flush"></ListGroup>
                        <Button variant="primary" className="float-right mt-4">
                            Checkout
                        </Button>
                    </Fragment>
                )}
            </Col>
        </Row>
    );
};

export default CartScreen;
