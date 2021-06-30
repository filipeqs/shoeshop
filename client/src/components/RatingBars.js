import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';

const RatingBars = ({ reviews }) => {
    const getNumberOfRatings = (numberOfStar) =>
        reviews.filter((review) => review.rating === numberOfStar).length;

    const getRatingPercetage = (numberOfStar) =>
        (getNumberOfRatings(numberOfStar) / reviews.length) * 100;

    return (
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
    );
};

export default RatingBars;
