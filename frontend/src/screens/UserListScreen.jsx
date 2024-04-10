import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listUsers, deleteUsers } from '../actions/userActions';

function UserListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userList = useSelector(state => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate, userInfo, successDelete]);

    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const openModal = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const confirmDelete = () => {
        dispatch(deleteUsers(userToDelete._id));
        closeModal();
    };

    return (
        <div>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm rounded">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <i className="fas fa-check" style={{ color: 'green' }}></i> : <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm rounded">
                                            <i className="fas fa-edit "></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm rounded" onClick={() => openModal(user)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}


            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {userToDelete && userToDelete.name}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            
        </div>
    );
}

export default UserListScreen;
