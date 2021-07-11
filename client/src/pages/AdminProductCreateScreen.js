import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from '../components/Loader';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AdminProductCreateScreen = ({ history }) => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState([{ count: '', size: '', _id: uuidv4() }]);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
    }, [dispatch, history, userInfo]);

    const addNewSize = () => setStock([...stock, { count: '', size: '', _id: uuidv4() }]);

    const submitHandler = (e) => {
        e.preventDefault();
    };

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

    return (
        <Container className="wrapper">
            <Breadcrumb>
                <LinkContainer to="/">
                    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin">
                    <Breadcrumb.Item href="#">Admin</Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to="/admin/productlist">
                    <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>Create</Breadcrumb.Item>
            </Breadcrumb>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                        id="image-file"
                        label="Choose File"
                        custom
                        onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="brand">
                    <Form.Label>Brand</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
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
                        onChange={(e) => setDescription(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default AdminProductCreateScreen;