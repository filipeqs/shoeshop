import React, { useState, Fragment } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductForm = ({ error, loading, submitHandler, product, update }) => {
    const [name, setName] = useState(product ? product.name : '');
    const [image, setImage] = useState(product ? product.image : '');
    const [brand, setBrand] = useState(product ? product.brand : '');
    const [description, setDescription] = useState(product ? product.description : '');
    const [price, setPrice] = useState(product ? product.price : 0);
    const [stock, setStock] = useState(
        product ? product.stock : [{ count: '', size: '', _id: uuidv4() }],
    );
    const [uploading, setUploading] = useState(false);

    const addNewSize = () => setStock([...stock, { count: '', size: '', _id: uuidv4() }]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        submitHandler({
            name,
            image,
            brand,
            description,
            price,
            stock: stock.map(({ count, size }) => ({
                count,
                size,
            })),
        });
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    required
                    onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Row>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            placeholder="Enter image URL"
                            value={image}
                            required
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Col>
                    <Col md={4}>
                        <Form.File
                            id="image-file"
                            label="Choose File"
                            custom
                            onChange={uploadFileHandler}
                        ></Form.File>
                    </Col>
                </Row>
                {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    required
                    onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock">
                {stock.map(({ count, size, _id }) => (
                    <Fragment key={_id}>
                        <Row>
                            <Col>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter count in stock"
                                    value={count}
                                    required
                                    onChange={(e) =>
                                        setStock(
                                            stock.map((item) =>
                                                item._id === _id
                                                    ? { ...item, count: e.target.value }
                                                    : item,
                                            ),
                                        )
                                    }
                                ></Form.Control>
                            </Col>
                            <Col>
                                <Form.Label>Size</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Size"
                                    value={size}
                                    required
                                    onChange={(e) =>
                                        setStock(
                                            stock.map((item) =>
                                                item._id === _id
                                                    ? { ...item, size: e.target.value }
                                                    : item,
                                            ),
                                        )
                                    }
                                ></Form.Control>
                            </Col>
                        </Row>
                    </Fragment>
                ))}
                <Button variant="primary" className="ml-auto" onClick={addNewSize}>
                    Add Size
                </Button>
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
                {update ? 'Update' : 'Create'}
            </Button>
        </Form>
    );
};

export default ProductForm;
