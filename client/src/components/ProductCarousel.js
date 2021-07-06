import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

import Loader from './Loader';
import Message from './Message';

import { getTopProducts } from '../redux/actions/productActions';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const productTopRated = useSelector((state) => state.productTopRated);
    const { loading, error, products } = productTopRated;

    useEffect(() => {
        dispatch(getTopProducts());
    }, [dispatch]);

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Carousel pause="hover" className="bg-dark">
            {products.map((product) => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className="carousel-cation">
                            <h3>
                                {product.name} (${product.price})
                            </h3>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ProductCarousel;
