import React from 'react';
import { Row, Col, Breadcrumb, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import ReviewForm from '../components/ReviewForm';

const ReviewProductScreen = () => {
    return (
        <Container className="wrapper">
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
        </Container>
    );
};

export default ReviewProductScreen;
