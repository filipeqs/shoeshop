import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

import Message from '../../components/Message';
import ReviewDetails from './ReviewDetails';

const ReviewList = () => {
    const productReviewList = useSelector((state) => state.productReviewList);
    const { reviews } = productReviewList;

    return (
        <Fragment>
            <h3>Recent Reviews</h3>
            {reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant="flush">
                {reviews.map((review) => (
                    <ReviewDetails review={review} key={review._id} />
                ))}
            </ListGroup>
        </Fragment>
    );
};

export default ReviewList;
