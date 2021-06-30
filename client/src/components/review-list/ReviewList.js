import React, { useEffect, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Form } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ReviewDetails from './ReviewDetails';
import Rating from '../Rating';
import RatingBars from '../RatingBars';

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

    const getReviewValue = () =>
        reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length || 0;

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Row className="mt-4">
            <Col md={4}>
                <h3>Customer reviews</h3>
                <Rating
                    value={getReviewValue()}
                    text={`${getReviewValue()} out of 5`}
                    color={'#f0ad4e'}
                />
                <p>{`${reviews.length} total ratings`}</p>
                {reviews.length !== 0 && <RatingBars reviews={reviews} />}
            </Col>
            <Col md={8}>
                <h3>Recent Reviews</h3>
                {reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant="flush">
                    {reviews.map((review) => (
                        <ReviewDetails review={review} key={review._id} />
                    ))}
                </ListGroup>
                <ListGroup variant="flush">
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
