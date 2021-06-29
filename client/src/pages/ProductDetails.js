import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import ReviewList from '../components/review-list/ReviewList';

import { getProductById } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';

const ProductDetails = ({ match, history }) => {
    const [selected, setSelected] = useState({ qty: 0, _id: '' });
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(getProductById(match.params.id));
    }, [match.params.id, dispatch]);

    useLayoutEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        };
    }, [dispatch]);

    const handleSelected = (e) => {
        const newSelected = product.stock.filter((value) => value._id === e.target.value)[0];
        setSelected({ ...newSelected, qty: 0 });
    };

    const handleQty = (e) => {
        setSelected({ ...selected, qty: e.target.value });
    };

    const handleAddToCard = () => {
        const productToAdd = {
            ...product,
            qty: Number(selected.qty),
            count: selected.count,
            size: selected.size,
            selectedId: selected._id,
        };

        dispatch(addToCart(productToAdd));
        history.push('/cart');
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Fragment>
            <Row>
                <Col md={6}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fluid
                        className="product-details__image"
                    />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="border-none">
                            <Row>
                                <Col>
                                    <h3>{product.name}</h3>
                                </Col>
                                <Col>
                                    <h3>${product.price}</h3>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-none">{product.brand}</ListGroup.Item>
                        <ListGroup.Item className="border-none">
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item className="border-none">
                            Description: {product.description}
                        </ListGroup.Item>
                        <ListGroup.Item className="border-none">
                            <Form.Control
                                as="select"
                                value={selected._id}
                                onChange={handleSelected}
                            >
                                <option value="" disabled defaultValue>
                                    Select a size
                                </option>
                                {product.stock.map(({ _id, size }) => (
                                    <option key={_id} value={_id}>
                                        {size}
                                    </option>
                                ))}
                            </Form.Control>
                        </ListGroup.Item>
                        {selected.size && (
                            <ListGroup.Item className="border-none">
                                Stock: {selected.count}
                            </ListGroup.Item>
                        )}
                        {selected.count && selected.count > 0 && (
                            <ListGroup.Item className="border-none">
                                <Form.Control
                                    as="select"
                                    value={selected.qty}
                                    onChange={handleQty}
                                    disabled={selected.count <= 0}
                                >
                                    <option value={0} disabled defaultValue>
                                        Select quantity
                                    </option>
                                    {[...Array(selected.count).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1} defaultValue={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item className="border-none">
                            <Button
                                onClick={handleAddToCard}
                                className="btn-block"
                                type="button"
                                disabled={selected.qty === 0}
                            >
                                <i className="fas fa-shopping-cart"></i> Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            {product && product._id && <ReviewList productId={product._id} />}
        </Fragment>
    );
};

export default ProductDetails;
