import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Loader from '../components/Loader';
import Message from '../components/Message';
import Order from '../components/Order';
import Paginate from '../components/Paginate';

import { listOrders } from '../redux/actions/orderActions';

const AdminOrderListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const [orderSearch, setOrderSearch] = useState('');

    const pageNumber = match.params.pageNumber || 1;

    const { userInfo } = useSelector((state) => state.userLogin);

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(listOrders(pageNumber));
    }, [dispatch, history, userInfo, pageNumber]);

    const handleSearchOrder = () => {
        dispatch(listOrders(pageNumber, orderSearch));
    };

    const handleClearSeach = () => {
        dispatch(listOrders(1));
        setOrderSearch('');
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
                <Breadcrumb.Item active>All Orders</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h3>All Orders</h3>
                    {error && <Message variant="danger">{error}</Message>}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search by Order ID"
                            aria-label="Search by Order ID"
                            aria-describedby="basic-addon2"
                            value={orderSearch}
                            onChange={(e) => setOrderSearch(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-dark"
                                className="btn-sm"
                                onClick={handleSearchOrder}
                                disabled={!orderSearch}
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
                    {orders.length === 0 ? (
                        <Message>No orders</Message>
                    ) : (
                        <Fragment>
                            {orders.map((order) => (
                                <Order key={order._id} order={order} />
                            ))}
                            <Paginate page={page} pages={pages} link={'/admin/orderlist'} />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Container>
    );
};

export default AdminOrderListScreen;
