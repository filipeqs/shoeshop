import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from './Product';
import { resetProducts } from '../redux/actions/productActions';

const ProductList = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList);
    const { products } = productList;

    useEffect(() => {
        return () => {
            dispatch(resetProducts());
        };
    }, [dispatch]);

    return (
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    );
};

export default ProductList;
