import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';

import Loader from './Loader';
import Message from './Message';
import Product from './Product';

import { getRandomProducts } from '../redux/actions/productActions';
import { Container } from 'react-bootstrap';

const ProductMultiCarousel = (props) => {
    const dispatch = useDispatch();

    const productRandom = useSelector((state) => state.productRandom);
    const { loading, error, products } = productRandom;

    useEffect(() => {
        dispatch(getRandomProducts());
    }, [dispatch]);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Fragment>
            <h3 className="text-center">YOU MIGHT LIKE</h3>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
            >
                {products.map((product) => (
                    <Container>
                        <Product key={product._id} product={product} />
                    </Container>
                ))}
            </Carousel>
        </Fragment>
    );
};

export default ProductMultiCarousel;
