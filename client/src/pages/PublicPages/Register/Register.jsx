import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import './register.css';
import { fetchData } from '../../../helpers/axiosHelper';

const initialValue = {
  name: '',
  lastname: '',
  email: '',
  password: '',
  repPassword: '',
};

const Register = () => {
  const [registerData, setRegisterData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      const result = await fetchData('user/register', 'post', registerData);
      console.log(result);
    } catch (error) {
      setErrorMsg('Ups ha habido un error');
      console.log(error);
    }
  };

  console.log(registerData);

  return (
    <section>
      <Container>
        <Row className="pt-5 d-flex align-items-center">
          <Col
            md={12}
            lg={6}
            className="d-flex justify-content-center justify-content-lg-end"
          >
            <div className="image-form">
              <img src="/assets/images/002.jpg" alt="" />
            </div>
          </Col>
          <Col md={12} lg={6}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="NameTextInput">Nombre</Form.Label>
                <Form.Control
                  id="NameTextInput"
                  name="name"
                  value={registerData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="LastNameTextInput">Apellidos</Form.Label>
                <Form.Control
                  id="LastNameTextInput"
                  name="lastname"
                  value={registerData.lastname}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="EmailTextInput">Email</Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="PasswordTextInput">Contraseña</Form.Label>
                <Form.Control
                  id="PasswordTextInput"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="RepPasswordTextInput">
                  Repite la contraseña
                </Form.Label>
                <Form.Control
                  id="RepPasswordTextInput"
                  name="repPassword"
                  value={registerData.repPassword}
                  onChange={handleChange}
                />
              </Form.Group>
              <p className="text-danger">{errorMsg}</p>
              <Button onClick={onSubmit}>Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
