import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumb, Container, InputGroup, FormControl, Button, Table } from 'react-bootstrap';
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
                <Breadcrumb.Item active>Users</Breadcrumb.Item>
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
                            <Table bordered hover responsive className="table-sm">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.isAdmin ? (
                                                    <i className="fas fa-check"></i>
                                                ) : (
                                                    <i className="fas fa-times"></i>
                                                )}
                                            </td>
                                            <td className="d-flex justify-content-around align-items-center">
                                                <Link
                                                    to={`/admin/user/${user._id}/edit`}
                                                    className="mr-2"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Paginate
                                page={page}
                                pages={pages}
                                link={
                                    userName
                                        ? `/admin/userlist/search/${userName}`
                                        : '/admin/userlist'
                                }
                            />
                        </Fragment>
                    )}
                </Fragment>
            )}
        </Container>
    );
};

export default AdminUserListScreen;
