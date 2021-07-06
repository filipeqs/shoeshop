import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

const ProductJumbotron = ({ title, text = '' }) => {
    return (
        <Jumbotron fluid>
            <Container>
                <p>{text}</p>
                <h3>{title}</h3>
            </Container>
        </Jumbotron>
    );
};

export default ProductJumbotron;
