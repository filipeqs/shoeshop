import React, { Fragment } from 'react';
import { Row, Col, Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ReviewForm from '../components/ReviewForm';

const ReviewProductScreen = () => {
    return (
        <Fragment>
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/orders">
                    <Breadcrumb.Item href="#">Orders</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Review</Breadcrumb.Item>
            </Breadcrumb>
            <Row>
                <Col md={8}>
                    <ReviewForm />
                </Col>
            </Row>
        </Fragment>
    );
};

export default ReviewProductScreen;
