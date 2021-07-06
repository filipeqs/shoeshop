import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import ProductCarousel from '../components/ProductCarousel';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';

import { getProducts, resetProducts } from '../redux/actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const [firstLoad, setFirstLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(getProducts(pageNumber));

        return () => {
            dispatch(resetProducts());
        };
    }, [dispatch, pageNumber]);

    const loadMore = () => {
        setPageNumber(pageNumber + 1);
        setFirstLoad(false);
    };

    return loading && firstLoad ? (
        <Loader />
    ) : (
        <div className="wrapper">
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
                            Load More
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
};

export default HomeScreen;
