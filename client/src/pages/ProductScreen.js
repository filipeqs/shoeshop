import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Breadcrumb } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import RatingBars from '../components/RatingBars';
import ReviewList from '../components/review-list/ReviewList';
import ProductDetails from '../components/ProductDetails';

import { getProductById, getReviewsByProductId } from '../redux/actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';

const ProductScreen = ({ match }) => {
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading: loadingProduct, error, product } = productDetails;

    const productReviewList = useSelector((state) => state.productReviewList);
    const { loading: loadingReviews } = productReviewList;

    const productReviewCreate = useSelector((state) => state.productReviewCreate);
    const { success: successProductReview } = productReviewCreate;

    useEffect(() => {
        dispatch(getProductById(match.params.id));
        dispatch(getReviewsByProductId(match.params.id));
    }, [match.params.id, dispatch, successProductReview]);

    return (
        <Fragment>
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Product</Breadcrumb.Item>
            </Breadcrumb>
            {loadingProduct ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Fragment>
                    <Row>
                        <ProductDetails />
                    </Row>
                    {loadingReviews ? (
                        <Loader />
                    ) : (
                        product &&
                        product._id && (
                            <Row className="mt-4">
                                <Col md={4}>
                                    <RatingBars />
                                </Col>
                                <Col md={8}>
                                    <ReviewList />
                                </Col>
                            </Row>
                        )
                    )}
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProductScreen;
