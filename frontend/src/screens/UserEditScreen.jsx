import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

function UserEditScreen() {
    const { id: userId } = useParams();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            navigate('/admin/userlist');
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, successUpdate, navigate, dispatch]);

    const submitHandler = e => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    };

    return (
        <div>
            <Link to="/admin/userlist" className="btn btn-light my-3">
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant="danger">{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" style={{ marginBottom: '30px' }}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="email" style={{ marginBottom: '30px' }}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="isAdmin" style={{ marginBottom: '30px' }}>
                            <Form.Check type="switch" label="Is Admin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                        </Form.Group>
                        <Button className="rounded" type="submit" variant="primary" style={{ marginBottom: '20px' }}>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to update this user?</Modal.Body>
                <Modal.Footer>
                    <Button className='rounded' variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button className='rounded' variant="primary" onClick={handleModalConfirm}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserEditScreen;
