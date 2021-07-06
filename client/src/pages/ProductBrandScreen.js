import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Breadcrumb, Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Product from '../components/Product';

import { getProducts, resetProducts } from '../redux/actions/productActions';

const ProductBrandScreen = ({ match }) => {
    const dispatch = useDispatch();
    const brand = match.params.brand;
    const [firstLoad, setFirstLoad] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(getProducts(pageNumber, brand));

        return () => {
            dispatch(resetProducts());
        };
    }, [dispatch, pageNumber, brand]);

    const loadMore = () => {
        setPageNumber(pageNumber + 1);
        setFirstLoad(false);
    };

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active className="text-capitalize">
                    {brand}
                </Breadcrumb.Item>
            </Breadcrumb>

            {loading && firstLoad ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
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
                </>
            )}
        </Container>
    );
};

export default ProductBrandScreen;
