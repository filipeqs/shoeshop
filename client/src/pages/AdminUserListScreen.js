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

import { listUsers } from '../redux/actions/userActions';

const AdminUserListScreen = ({ history, match }) => {
    const dispatch = useDispatch();
    const [searchUserName, setSearchUserName] = useState('');

    const { userInfo } = useSelector((state) => state.userLogin);

    const userList = useSelector((state) => state.userList);
    const { loading, error, users, page, pages } = userList;

    const pageNumber = match.params.pageNumber || 1;
    const userName = match.params.userName || '';

    useEffect(() => {
        if (!userInfo) history.push('/login');
        else if (!userInfo.isAdmin) history.push('/');
        else dispatch(listUsers(pageNumber, userName));
    }, [dispatch, history, userInfo, pageNumber, userName]);

    const handleSearchUser = () => {
        history.push(`/admin/userlist/search/${searchUserName}`);
    };

    const handleClearSeach = () => {
        history.push('/admin/userlist');
        setSearchUserName('');
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
                <Breadcrumb.Item active>All Users</Breadcrumb.Item>
            </Breadcrumb>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <h3>All Users</h3>
                    {error && <Message variant="danger">{error}</Message>}
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Search User by Name"
                            aria-label="Search User by Name"
                            aria-describedby="basic-addon2"
                            value={searchUserName}
                            onChange={(e) => setSearchUserName(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-dark"
                                className="btn-sm"
                                onClick={handleSearchUser}
                                disabled={!searchUserName}
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
                    {users.length === 0 ? (
                        <Message>No users</Message>
                    ) : (
                        <Fragment>
                            {users.map((user) => (
                                <ListGroup key={user._id} className="mt-4">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col md={3}>
                                                <h5>Name</h5>
                                                <div>{user.name}</div>
                                            </Col>
                                            <Col md={3}>
                                                <h5>Email</h5>
                                                <div>{user.email}</div>
                                            </Col>
                                            <Col md={3}>
                                                <h5>Admin</h5>
                                                <div>{user.isAdmin ? 'YES' : 'NO'}</div>
                                            </Col>
                                            <Col md={3} className="float-right">
                                                <div className="float-right">
                                                    <h5>User# {user._id}</h5>
                                                    <Link to={`/`}>Edit User</Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                            ))}
                            <Paginate page={page} pages={pages} link={'/admin/userlist'} />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Container>
    );
};

export default AdminUserListScreen;
