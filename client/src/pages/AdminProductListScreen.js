import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Breadcrumb,
    Container,
    InputGroup,
    FormControl,
    Button,
    Row,
    Col,
    ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import { getAllProducts } from '../redux/actions/productActions';

const AdminProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const [productSearch, setProductSearch] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productListAll = useSelector((state) => state.productListAll);
    const { loading, error, products, page, pages } = productListAll;

    const pageNumber = match.params.pageNumber || 1;
    const productName = match.params.productName || '';

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(getAllProducts(pageNumber, productName));
    }, [dispatch, history, userInfo, pageNumber, productName]);

    const handleSearchProduct = () => {
        history.push(`/admin/productlist/search/${productSearch}`);
    };

    const handleClearSeach = () => {
        history.push('/admin/productlist');
        setProductSearch('');
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
                <Breadcrumb.Item active>All Products</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h3>All Products</h3>
                    {error && <Message variant="danger">{error}</Message>}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search by Order ID"
                            aria-label="Search by Order ID"
                            aria-describedby="basic-addon2"
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-dark"
                                className="btn-sm"
                                onClick={handleSearchProduct}
                                disabled={!productSearch}
                            >
                                <i className="fas fa-search pr-4 pl-4"></i>
                            </Button>
                        </InputGroup.Append>
                        <Button
                            variant="outline-dark"
                            className="btn-sm"
                            onClick={handleClearSeach}
                        >
                            Clear Search
                        </Button>
                    </InputGroup>
                    {products.length === 0 ? (
                        <Message>No products</Message>
                    ) : (
                        <Fragment>
                            {products.map((product) => (
                                <ListGroup key={product._id} className="mt-4">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={3}>
                                                <h5>Name</h5>
                                                <div>{product.name}</div>
                                            </Col>
                                            <Col md={3}>
                                                <h5>Brand</h5>
                                                <div>{product.brand}</div>
                                            </Col>
                                            <Col md={3}>
                                                <h5>Price</h5>
                                                <div>${product.price}</div>
                                            </Col>
                                            <Col md={3} className="float-right">
                                                <div className="float-right">
                                                    <h5>Product# {product._id}</h5>
                                                    <Link to={`/`}>Edit Product</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                            <Paginate
                                page={page}
                                pages={pages}
                                link={
                                    productName
                                        ? `/admin/productlist/search/${productName}`
                                        : '/admin/productlist'
                                }
                            />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Container>
    );
};

export default AdminProductListScreen;
