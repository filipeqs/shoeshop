import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Button, Form } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import Rating from '../components/Rating';

import { getProductById } from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';

const ProductDetails = ({ match, history }) => {
    const [selected, setSelected] = useState({ qty: 0, _id: '' });
    const dispatch = useDispatch();

    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const { name, image, price, description, brand, stock, rating, reviews, numReviews } = product;

    const { userInfo } = useSelector((state) => state.userLogin);

    useEffect(() => {
        dispatch(getProductById(match.params.id));
    }, [match.params.id, dispatch]);

    const handleSelected = (e) => {
        const newSelected = stock.filter((value) => value._id === e.target.value)[0];
        setSelected({ ...newSelected, qty: 0 });
    };

    const handleQty = (e) => {
        setSelected({ ...selected, qty: e.target.value });
    };

    const handleAddToCard = () => {
        const productToAdd = {
            ...product,
            qty: Number(selected.qty),
            count: selected.count,
            size: selected.size,
            selectedId: selected._id,
        };

        dispatch(addToCart(productToAdd));
        history.push('/cart');
    };

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant="danger">{error}</Message>
    ) : (
        <Fragment>
            <Row>
                <Col md={6}>
                    <Image src={image} alt={name} fluid />
                </Col>
                <Col md={6}>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="border-none">
                            <Row>
                                <Col>
                                    <h3>{name}</h3>
                                </Col>
                                <Col>
                                    <h3>${price}</h3>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="border-none">{brand}</ListGroup.Item>
                        <ListGroup.Item className="border-none">
                            <Rating value={rating} text={`${numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item className="border-none">
                            Description: {description}
                        </ListGroup.Item>
                        <ListGroup.Item className="border-none">
                            <Form.Control
                                as="select"
                                value={selected._id}
                                onChange={handleSelected}
                            >
                                <option value="" disabled defaultValue>
                                    Select a size
                                </option>
                                {stock.map(({ _id, size }) => (
                                    <option key={_id} value={_id}>
                                        {size}
                                    </option>
                                ))}
                            </Form.Control>
                        </ListGroup.Item>
                        {selected.size && (
                            <ListGroup.Item className="border-none">
                                Stock: {selected.count}
                            </ListGroup.Item>
                        )}
                        {selected.count && selected.count > 0 && (
                            <ListGroup.Item className="border-none">
                                <Form.Control
                                    as="select"
                                    value={selected.qty}
                                    onChange={handleQty}
                                    disabled={selected.count <= 0}
                                >
                                    <option value={0} disabled defaultValue>
                                        Select quantity
                                    </option>
                                    {[...Array(selected.count).keys()].map((x) => (
                                        <option key={x + 1} value={x + 1} defaultValue={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </Form.Control>
                            </ListGroup.Item>
                        )}
                        <ListGroup.Item className="border-none">
                            <Button
                                onClick={handleAddToCard}
                                className="btn-block"
                                type="button"
                                disabled={selected.qty === 0}
                            >
                                <i className="fas fa-shopping-cart"></i> Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup variant="flush">
                        {reviews.map((review) => (
                            <ListGroup.Item key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating} />
                                <p>Reviewed at {review.createdAt.substring(0, 10)}</p>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <h2>Write a Customer Review</h2>

                            {userInfo ? (
                                <Form>
                                    <Form.Group controlId="rating">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select">
                                            <option value="">Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment">
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as="textarea" row="3"></Form.Control>
                                    </Form.Group>
                                    <Button type="submit" variant="primary">
                                        Submit
                                    </Button>
                                </Form>
                            ) : (
                                <Message>
                                    Please <Link to="/login">sign in</Link> to write a review
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </Fragment>
    );
};

export default ProductDetails;
