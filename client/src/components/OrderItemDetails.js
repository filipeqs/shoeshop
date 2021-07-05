import React from 'react';
import { ListGroup, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderItemDetails = ({ orderItem }) => {
    return (
        <ListGroup.Item>
            <Row>
                <Col md={2}>
                    <Link to={`/product/${orderItem.productId}`}>
                        <Image
                            src={orderItem.image}
                            alt={orderItem.name}
                            fluid
                            className="bg-whitesmoke"
                        />
                    </Link>
                </Col>
                <Col md={4}>
                    <Link to={`/product/${orderItem.productId}`}>
                        <h4>{orderItem.name}</h4>
                    </Link>
                    <div>Size: {orderItem.size}</div>
                    <div>${orderItem.price}</div>
                </Col>
                <Col md={6}>
                    <Link
                        to={`/product/${orderItem.productId}`}
                        className="float-right btn btn-outline-dark"
                    >
                        View Product
                    </Link>
                </Col>
            </Row>
        </ListGroup.Item>
    );
};

export default OrderItemDetails;
