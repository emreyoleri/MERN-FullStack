import React from "react";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Row className="fixed-bottom bg-dark">
        <Col className="text-center py-2 text-white">
          Copyright &copy; Memory Box
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;
