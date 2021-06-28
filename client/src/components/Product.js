import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product }) => {
    const { _id, name, price, brand, image, rating } = product;

    return (
        <Card className="my-3 border-none">
            <Link to={`/product/${_id}`}>
                <Card.Img src={image} variant="top" className="product__image" />
            </Link>

            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as="div" className="product__title">
                        <span>{name}</span>
                        <span>${price}</span>
                    </Card.Title>
                </Link>

                <Card.Text as="p">{brand}</Card.Text>

                <Card.Text as="div">
                    <Rating value={rating} />
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
