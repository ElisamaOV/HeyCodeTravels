import React, { useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import './register.css';
import { fetchData } from '../../../helpers/axiosHelper';
import { registerSchema } from '../../../schemas/registerSchema';
import { ZodError } from 'zod';

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
  const [valErrors, setValErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      registerSchema.parse(registerData);
      const result = await fetchData('user/register', 'post', registerData);
      console.log('EEEEEEEEEEEEERROR', result);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('qwerasdfasdfqwersdf', error.errors);
        //MANEJO DE OBJETOS TEMPORALES
        let objTemp = {};
        error.errors.forEach((er) => {
          objTemp[er.path[0]] = er.message;
          //MANEJO DE OBJETOS TEMPORALES FINAL
        });
        setValErrors(objTemp);
      }
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg('Ups, ha habido un error');
      }
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
                {valErrors.name && (
                  <p className="text-danger">{valErrors.name}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="LastNameTextInput">Apellidos</Form.Label>
                <Form.Control
                  id="LastNameTextInput"
                  name="lastname"
                  value={registerData.lastname}
                  onChange={handleChange}
                />
                {valErrors.lastname && (
                  <p className="text-danger">{valErrors.lastname}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="EmailTextInput">Email</Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                />
                {valErrors.email && (
                  <p className="text-danger">{valErrors.email}</p>
                )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="PasswordTextInput">Contraseña</Form.Label>
                <Form.Control
                  id="PasswordTextInput"
                  name="password"
                  value={registerData.password}
                  onChange={handleChange}
                />
                {valErrors.password && (
                  <p className="text-danger">{valErrors.password}</p>
                )}
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
                {valErrors.repPassword && (
                  <p className="text-danger">{valErrors.repPassword}</p>
                )}
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
