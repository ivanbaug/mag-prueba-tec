import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center pt-3' >Copyright &copy; Ivan Bautista {new Date().getFullYear()}</Col>
        </Row>
        <Row>
          <Col className='text-center pb-3' >
            Check the code in my <a href="https://github.com/ivanbaug/mag-prueba-tec">Github <i className='fab fa-github' /></a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
};

export default Footer;
