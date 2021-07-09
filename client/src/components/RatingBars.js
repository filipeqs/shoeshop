import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';

import Rating from './Rating';
import Loader from './Loader';

import { getAllReviewsByProductId } from '../redux/actions/productActions';

const RatingBars = ({ match }) => {
    const dispatch = useDispatch();

    const productReviewListAll = useSelector((state) => state.productReviewListAll);
    const { reviews, loading } = productReviewListAll;

    useEffect(() => {
        dispatch(getAllReviewsByProductId(match.params.id));
    }, [dispatch, match.params.id]);

    const getNumberOfRatings = (numberOfStar) =>
        reviews.filter((review) => review.rating === numberOfStar).length;

    const getRatingPercetage = (numberOfStar) =>
        (getNumberOfRatings(numberOfStar) / reviews.length) * 100;

    const getReviewValue = () =>
        reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length || 0;

    const fixed = (number) => number.toFixed(1);

    const getRatingPercetageFixed = compose([fixed, getRatingPercetage]);

    const getReviewValueFixed = compose([fixed, getReviewValue]);

    return (
        <Fragment>
            <h3>Customer reviews</h3>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Rating
                        value={getReviewValue()}
                        text={`${getReviewValueFixed()} out of 5`}
                        color={'#f0ad4e'}
                    />
                    <p>{`${reviews.length} total ratings`}</p>
                    {reviews.length !== 0 && (
                        <div>
                            <Row>
                                <Col md={3}>5 star</Col>
                                <Col md={7}>
                                    <ProgressBar
                                        variant="warning"
                                        now={getRatingPercetageFixed(5)}
                                    />
                                </Col>
                                <Col md={2}>{getRatingPercetageFixed(5)}%</Col>
                            </Row>
                            <Row>
                                <Col md={3}>4 star</Col>
                                <Col md={7}>
                                    <ProgressBar
                                        variant="warning"
                                        now={getRatingPercetageFixed(4)}
                                    />
                                </Col>
                                <Col md={2}>{getRatingPercetageFixed(4)}%</Col>
                            </Row>
                            <Row>
                                <Col md={3}>3 star</Col>
                                <Col md={7}>
                                    <ProgressBar
                                        variant="warning"
                                        now={getRatingPercetageFixed(3)}
                                    />
                                </Col>
                                <Col md={2}>{getRatingPercetageFixed(3)}%</Col>
                            </Row>
                            <Row>
                                <Col md={3}>2 star</Col>
                                <Col md={7}>
                                    <ProgressBar
                                        variant="warning"
                                        now={getRatingPercetageFixed(2)}
                                    />
                                </Col>
                                <Col md={2}>{getRatingPercetageFixed(2)}%</Col>
                            </Row>
                            <Row>
                                <Col md={3}>1 star</Col>
                                <Col md={7}>
                                    <ProgressBar
                                        variant="warning"
                                        now={getRatingPercetageFixed(1)}
                                    />
                                </Col>
                                <Col md={1}>{getRatingPercetageFixed(1)}%</Col>
                            </Row>
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default withRouter(RatingBars);
