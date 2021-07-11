import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Breadcrumb,
    Container,
    InputGroup,
    FormControl,
    Button,
    Table,
    Row,
    Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

import { getAllProducts, deleteProduct } from '../redux/actions/productActions';

const AdminProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const [productSearch, setProductSearch] = useState('');

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productListAll = useSelector((state) => state.productListAll);
    const { loading, error, products, page, pages } = productListAll;

    const productDelete = useSelector((state) => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const pageNumber = match.params.pageNumber || 1;
    const productName = match.params.productName || '';

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(getAllProducts(pageNumber, productName));
    }, [dispatch, history, userInfo, pageNumber, productName, successDelete]);

    const handleSearchProduct = () => {
        history.push(`/admin/productlist/search/${productSearch}`);
    };

    const handleClearSeach = () => {
        history.push('/admin/productlist');
        setProductSearch('');
    };

    const deleteHandler = (id) => {
        if (window.confirm('Are you sute?')) {
            dispatch(deleteProduct(id));
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
                <Breadcrumb.Item active>Products</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <Row className="align-items-center">
                        <Col>
                            <h3>All Products</h3>
                        </Col>
                        <Col className="text-right">
                            <Button
                                className="my-3"
                                onClick={() => history.push('/admin/product/create')}
                            >
                                <i className="fas fa-plus"></i> Create Product
                            </Button>
                        </Col>
                    </Row>
                    {error && <Message variant="danger">{error}</Message>}
                    {loadingDelete && <Loader />}
                    {errorDelete && <Message variant="danger">{errorDelete}</Message>}
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
                            <Table striped bordered hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.brand}</td>
                                            <td className="d-flex justify-content-around align-items-center">
                                                <Link to={`/product/${product._id}`}>
                                                    <i className="fas fa-eye"></i>
                                                </Link>
                                                <Link
                                                    to={`/admin/product/${product._id}/edit`}
                                                    className="mr-2"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <Button
                                                    variant="danger"
                                                    className="btn-sm"
                                                    onClick={() => deleteHandler(product._id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
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
