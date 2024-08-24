import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <p>© 2024</p>
                    </Col>
                    <Col md={6} className="text-md-right">
                        <p>UNIR: DESARROLLO WEB INTEGRAL</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
