import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { userActions } from "../redux/actions/index";
import Message from "../Components/Message";

const AuthScreen = ({ history }) => {
  const [login, setLogin] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confrimPassword: "",
  });

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const { signUp, signIn } = bindActionCreators(userActions, dispatch);
  const userState = useSelector((state) => state.user);
  const { error } = userState;
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          {login ? (
            <Form
              className="align-content-center mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                signIn(loginForm, history);
              }}
            >
              <h1 className="text-center mb-3">Login</h1>
              {error && <Message>{error}</Message>}

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your e-mail"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <div className="d-grid gap-2 mt-3">
                <Button type="submit" style={{ height: "50px" }}>
                  Login
                </Button>
              </div>

              <Form.Text
                className="text-center mt-3"
                style={{ fontSize: "18px" }}
              >
                Don't you have an account yet ?
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => setLogin(!login)}
                  className="m-1"
                >
                  Register
                </span>
              </Form.Text>
            </Form>
          ) : (
            <Form
              className="align-content-center mt-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!login) signUp(form, history);
              }}
            >
              <h1 className="text-center">Register</h1>
              {error && <Message>{error}</Message>}
              <Form.Group className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  className="mr-2"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                ></Form.Control>

                <Form.Control
                  type="text"
                  placeholder="Surname"
                  className="ml-2"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your e-mail address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Verify your password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Verify your password"
                  value={form.confrimPassword}
                  onChange={(e) =>
                    setForm({ ...form, confrimPassword: e.target.value })
                  }
                ></Form.Control>
              </Form.Group>

              <div className="d-grid gap-2 mt-3">
                <Button type="submit" style={{ height: "50px" }}>
                  Register
                </Button>
              </div>

              <Form.Text
                style={{ fontSize: "18px" }}
                className="text-center mt-3"
              >
                Do you have an account ?
                <span
                  style={{ fontWeight: "bold", cursor: "pointer" }}
                  onClick={() => setLogin(!login)}
                  className="m-1"
                >
                  Login
                </span>
              </Form.Text>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AuthScreen;
