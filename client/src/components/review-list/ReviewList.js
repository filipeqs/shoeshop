import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import Message from '../../components/Message';
import ReviewDetails from './ReviewDetails';
import AlertMessage from '../../components/AlertMessage';

const ReviewList = () => {
    const productReviewList = useSelector((state) => state.productReviewList);
    const { reviews } = productReviewList;

    return (
        <Fragment>
            <h3>Recent Reviews</h3>
            <AlertMessage />
            {reviews.length === 0 && <Message variant="info">No Reviews</Message>}
            <ListGroup variant="flush">
                {reviews.map((review) => (
                    <ReviewDetails review={review} key={review._id} />
                ))}
            </ListGroup>
        </Fragment>
    );
};

export default ReviewList;
