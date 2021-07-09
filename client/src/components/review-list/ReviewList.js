import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { ListGroup } from 'react-bootstrap';

import Message from '../../components/Message';
import ReviewDetails from './ReviewDetails';
import AlertMessage from '../../components/AlertMessage';
import Paginate from '../Paginate';
import Loader from '../Loader';

import { getReviewsByProductId } from '../../redux/actions/productActions';

const ReviewList = ({ match }) => {
    const dispatch = useDispatch();

    const pageNumber = match.params.pageNumber || 1;

    const productReviewList = useSelector((state) => state.productReviewList);
    const { reviews, page, pages, productId, loading, error } = productReviewList;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { success: successProductReview } = productReviewCreate;

    useEffect(() => {
        dispatch(getReviewsByProductId(match.params.id, pageNumber));
    }, [match.params.id, dispatch, successProductReview, pageNumber]);

    return (
        <Fragment>
            <h3>Recent Reviews</h3>
            <AlertMessage />
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : reviews.length === 0 ? (
                <Message variant="info">No Reviews</Message>
            ) : (
                <ListGroup variant="flush">
                    {reviews.map((review) => (
                        <ReviewDetails review={review} key={review._id} />
                    ))}
                    <Paginate page={page} pages={pages} link={`/product/${productId}`} />
                </ListGroup>
            )}
        </Fragment>
    );
};

export default withRouter(ReviewList);
