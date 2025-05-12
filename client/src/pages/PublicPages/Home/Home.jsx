import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './home.css';

const Home = () => {
  return (
    <section>
      <Container fluid="lg">
        <Row>
          <Col className="d-flex flex-column align-items-center justify-content-center">
            <h1>Travels</h1>
            <div className="portada">
              <img src="/assets/images/001.jpg" alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Home;
