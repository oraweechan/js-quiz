import { Col, Row, Container, Form } from "react-bootstrap";
import { Typography, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { auth } from "../../firebase/utils";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  // const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const loginUser = { email, password };
    //   const loginResponse = await axios.post(
    //     "https://travelgram-app-heroku.herokuapp.com/users/login",
    //     loginUser
    //   );
    //   setUserData({
    //     token: loginResponse.data.token,
    //     user: loginResponse.data.user,
    //   });
    //   localStorage.setItem("auth-token", loginResponse.data.token);
    //   navigate("/play");
    // } 
    // catch (err) {
    //   err.response.data.msg && setError(err.response.data.msg);
    // }
  };

  return (
    <>
      <Container component="main">
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <Paper
              className="w-responsive text-center mx-auto p-5 mt-2"
              elevation={3}
            >
              <Row className="justify-content-md-center">
                <Col sm={12}>
                  <Typography fontFamily="'Poppins', sans-serif">
                    <h2>Sign In</h2>
                  </Typography>
                  {/* {error && (
                    <ErrorNotice
                      message={error}
                      clearError={() => setError(undefined)}
                    />
                  )} */}

                  <Form onSubmit={handleSubmit}>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextEmail"
                    >
                      <Form.Label column sm="4" md="12"></Form.Label>
                      <Col sm="12">
                        <TextField
                          fullWidth
                          name="email"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          label="Email"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId="formPlaintextPassword"
                    >
                      <Col sm="12">
                        <TextField
                          fullWidth
                          name="password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          label="Password"
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Button
                      style={{ backgroundColor: "#1A76D2" }}
                      variant="contained"
                      size="large"
                      type="submit"
                    >
                      Submit
                    </Button>
                    {/* <Button
                      style={{ backgroundColor: "#1A76D2" }}
                      variant="contained"
                      size="large"
                      onClick={signInWithGoogle}
                    >
                      Sign in with Google
                    </Button> */}
                  </Form>
                </Col>
              </Row>
            </Paper>

            <Paper
              className="w-responsive text-center mx-auto p-3 mt-4"
              elevation={3}
            >
              <p>New to QuizJS?</p>

              <Link style={linkStyle} to="/signup">
                <Button
                  style={{ backgroundColor: "#1A76D2" }}
                  variant="contained"
                  size="medium"
                >
                  <Link style={linkStyle} to="/signup">
                    Create an Account
                  </Link>
                </Button>
              </Link>
            </Paper>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
