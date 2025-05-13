import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.css';
import { AuthContest } from '../../../context/AuthContextProvider';

const initialValue = {
  email: '',
  password: '',
};

const Login = () => {
  const [loginData, setLoginData] = useState(initialValue);
  const [errorMsg, setErrorMsg] = useState('');
  const { login } = useContext(AuthContest);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  console.log(loginData);

  const onSubmit = async () => {
    try {
      login(loginData);

      //MANDAMOS AL BACK
    } catch (error) {
      console.log('loooooooooooooooooooogin', error);

      //ERRORS
    }
  };

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
                <Form.Label htmlFor="EmailTextInput">Email</Form.Label>
                <Form.Control
                  id="EmailTextInput"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="PasswordTextInput">Contraseña</Form.Label>
                <Form.Control
                  id="PasswordTextInput"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <p className="text-danger">{errorMsg}</p>
              <Button onClick={onSubmit}>Submit</Button>
            </Form>
            <p className="mt-2">
              Si no estás registrado <Link to="/register">registrate aquí</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
