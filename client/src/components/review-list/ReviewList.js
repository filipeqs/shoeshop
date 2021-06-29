import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';

import Message from '../../components/Message';
import Rating from '../../components/Rating';
import Loader from '../../components/Loader';

import { createProductReview, getReviewsByProductId } from '../../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/constants/productConstants';

const ReviewList = ({ productId }) => {
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.userLogin);

    const productReviewList = useSelector((state) => state.productReviewList);
    const { reviews, loading, error } = productReviewList;

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
        dispatch(getReviewsByProductId(productId));
    }, [dispatch, productId, successProductReview]);

    useLayoutEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProductReview(productId, { rating, comment }));
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Row className="mt-2">
            <Col md={4}></Col>
            <Col md={8}>
                <h3>Reviews</h3>
                {reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                    {reviews.map((review) => (
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
    );
};

export default ReviewList;
