import React, { useEffect, useState, useLayoutEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';

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
    }, [dispatch, pageNumber]);

    useLayoutEffect(() => {
        return () => {
            dispatch(resetProducts());
        };
    }, [dispatch]);

    const loadMore = () => {
        setPageNumber(pageNumber + 1);
        setFirstLoad(false);
    };

    return loading && firstLoad ? (
        <Loader />
    ) : (
        <Fragment>
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
                    <Button variant="primary" onClick={loadMore}>
                        Load More
                    </Button>
                )}
            </div>
        </Fragment>
    );
};

export default HomeScreen;
