import React, { Fragment, useEffect, useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating';

import { getProductById, createProductReview } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';

const ProductDetails = ({ match, history }) => {
    const [selected, setSelected] = useState({ qty: 0, _id: '' });
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        success: successProductReview,
        error: errorProductReview,
        loading: loadingProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setMessage('Review Submited');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(getProductById(match.params.id));
    }, [match.params.id, dispatch, successProductReview]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProductReview(match.params.id, { rating, comment }));
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

            <Row className="mt-2">
                <Col md={6}>
                    <h3>Reviews</h3>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant="flush">
                        {product.reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>Reviewed at {review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h4>Write a Customer Review</h4>
                            {errorProductReview && (
                                <Message variant="danger">{errorProductReview}</Message>
                            )}
                            {message && <Message variant="success">{message}</Message>}
                            {userInfo ? (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={rating}
                                            required
                                            onChange={(e) => setRating(e.target.value)}
                                        >
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            row="3"
                                            value={comment}
                                            required
                                            onChange={(e) => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={loadingProductReview}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to="/login">sign in</Link> to write a review
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ProductDetails;
