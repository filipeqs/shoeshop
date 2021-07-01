import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, ProgressBar } from 'react-bootstrap';

import Rating from './Rating';

const RatingBars = () => {
    const productReviewList = useSelector((state) => state.productReviewList);
    const { reviews } = productReviewList;

    const getNumberOfRatings = (numberOfStar) =>
        reviews.filter((review) => review.rating === numberOfStar).length;

    const getRatingPercetage = (numberOfStar) =>
        (getNumberOfRatings(numberOfStar) / reviews.length) * 100;

    const getReviewValue = () =>
        reviews.reduce((acc, review) => review.rating + acc, 0) / reviews.length || 0;

    return (
        <Fragment>
            <h3>Customer reviews</h3>
            <Rating
                value={getReviewValue()}
                text={`${getReviewValue()} out of 5`}
                color={'#f0ad4e'}
            />
            <p>{`${reviews.length} total ratings`}</p>
            {reviews.length !== 0 && (
                <div>
                    <Row>
                        <Col md={3}>5 star</Col>
                        <Col md={7}>
                            <ProgressBar variant="warning" now={getRatingPercetage(5)} />
                        </Col>
                        <Col md={2}>{getRatingPercetage(5)}%</Col>
                    </Row>
                    <Row>
                        <Col md={3}>4 star</Col>
                        <Col md={7}>
                            <ProgressBar variant="warning" now={getRatingPercetage(4)} />
                        </Col>
                        <Col md={2}>{getRatingPercetage(4)}%</Col>
                    </Row>
                    <Row>
                        <Col md={3}>3 star</Col>
                        <Col md={7}>
                            <ProgressBar variant="warning" now={getRatingPercetage(3)} />
                        </Col>
                        <Col md={2}>{getRatingPercetage(3)}%</Col>
                    </Row>
                    <Row>
                        <Col md={3}>2 star</Col>
                        <Col md={7}>
                            <ProgressBar variant="warning" now={getRatingPercetage(2)} />
                        </Col>
                        <Col md={2}>{getRatingPercetage(2)}%</Col>
                    </Row>
                    <Row>
                        <Col md={3}>1 star</Col>
                        <Col md={7}>
                            <ProgressBar variant="warning" now={getRatingPercetage(1)} />
                        </Col>
                        <Col md={1}>{getRatingPercetage(1)}%</Col>
                    </Row>
                </div>
            )}
        </Fragment>
    );
};

export default RatingBars;
