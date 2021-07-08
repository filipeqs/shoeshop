import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import ProductCarousel from '../components/ProductCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';

import { getProducts } from '../redux/actions/productActions';
import { PRODUCT_LIST_RESET } from '../redux/constants/productConstants';

const HomeScreen = ({ location }) => {
    const dispatch = useDispatch();
    const [firstLoad, setFirstLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(getProducts(pageNumber));
    }, [dispatch, pageNumber]);

    useEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_LIST_RESET });
        };
    }, [dispatch]);

    const loadMore = () => {
        setPageNumber(pageNumber + 1);
        setFirstLoad(false);
    };

    return (
        <div className="wrapper">
            {loading && firstLoad ? (
                <Loader />
            ) : (
                <Fragment>
                    <ProductCarousel />

                    <Container>
                        {error && <Message variant="danger">{error}</Message>}
                        <Row>
                            {products.map((product) => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>

                        <div className="product__btn">
                            {page < pages && (
                                <div className="btn btn-outline-dark" onClick={loadMore}>
                                    {loading ? 'Loading...' : 'Load More'}
                                </div>
                            )}
                        </div>
                    </Container>
                </Fragment>
            )}
        </div>
    );
};

export default HomeScreen;
