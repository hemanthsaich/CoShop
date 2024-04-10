import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-primary text-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5 style={{color:'white'}}>About CoShop</h5>
            <p>CoShop is your one-stop destination for online shopping. We offer a wide range of products including electronics, fashion, home goods, and more. Our dedicated team is committed to providing you with the best shopping experience possible.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <h5 style={{color:'white'}}>Contact Us</h5>
            <p>Email: info@coshop.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Address: 456 Main St, City, Country</p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row className="text-center">
          <Col>
            <p className="mb-0">&copy; 2024 CoShop. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
