import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Nav, Container, Modal, NavDropdown, Button, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBar from './SearchBar';

function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const dispatch = useDispatch();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const logoutHandler = () => {
        setShowLogoutModal(true);
    };

    const handleLogout = () => {
        dispatch(logout());
        setShowLogoutModal(false);
    };

    return (
        <header>
            <Navbar className="navbar bg-light" data-bs-theme="light" expand="md" collapseOnSelect style={{paddingBottom:'15px', paddingTop: '15px'}} >
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <i className="fas fa-shopping-cart"></i>
                            <b>CoShop</b>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        
                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>
                                    <b>Home</b>
                                </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/about">
                                <Nav.Link>
                                    <b>About</b>
                                </Nav.Link>
                            </LinkContainer>

                            <NavDropdown title="Categories" id="categories">
                                <LinkContainer to="/categories/men">
                                    <NavDropdown.Item>
                                    <b>Men</b>
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/categories/women">
                                    <NavDropdown.Item>
                                    <b>Women</b>
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/categories/electronic">
                                    <NavDropdown.Item>
                                    <b>Electronics</b>
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/categories/footwear">
                                    <NavDropdown.Item>
                                    <b>Footwear</b>
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>

                            <SearchBar />

                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <b>Cart</b>
                                </Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            <b>Profile</b>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        <b>Logout</b>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login" >
                                    <Nav.Link>
                                        <b>Login</b>
                                    </Nav.Link>
                                </LinkContainer>
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title="Admin" id="adminmenu">
                                    <LinkContainer to="/admin/userlist">
                                        <NavDropdown.Item>
                                            <b>Users</b>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist">
                                        <NavDropdown.Item>
                                            <b>Products</b>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/orderlist">
                                        <NavDropdown.Item>
                                            <b>Orders</b>
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <Button className='rounded' variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                    </Button>
                    <Button  className='rounded' variant="primary" onClick={handleLogout}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </header>
    );
}

export default Header;
