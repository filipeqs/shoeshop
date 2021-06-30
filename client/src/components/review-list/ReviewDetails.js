import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Rating from '../../components/Rating';

const ReviewDetails = ({ review }) => {
    return (
        <ListGroup.Item>
            <strong>{review.name}</strong>
            <Rating value={review.rating} />
            <p>Reviewed at {review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
        </ListGroup.Item>
    );
};

export default ReviewDetails;
