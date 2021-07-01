import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';

import { createProductReview } from '../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';

const ReviewForm = () => {
    const dispatch = useDispatch();

    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const { userInfo } = useSelector((state) => state.userLogin);

    const productDetails = useSelector((state) => state.productDetails);
    const { product } = productDetails;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const {
        success: successProductReview,
        error: errorProductReview,
        loading: loadingProductReview,
    } = productReviewCreate;

    useEffect(() => {
        if (successProductReview) {
            setMessage('Review Submited');
            setRating(0);
            setComment('');
        }

        return () => {
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        };
    }, [dispatch, successProductReview]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProductReview(product._id, { rating, comment }));
    };

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>
                <h4>Write a Customer Review</h4>
                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
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
                        <Button type="submit" variant="dark" disabled={loadingProductReview}>
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
    );
};

export default ReviewForm;
