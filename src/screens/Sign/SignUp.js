import Button from "@mui/material/Button";
import { Container, Row, Col } from "react-bootstrap";
import { Typography } from "@mui/material";
import { Paper } from "@mui/material";
import { Form } from "react-bootstrap";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { auth, db } from "../../firebase/utils";
import {
  doc,
  setDoc
} from "firebase/firestore";

function SignUp() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [displayName, setDisplayName] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", user.user.uid), {
        email: email,
        displayName: displayName,
        uid: user.user.uid,
        results: [""]
      });
      navigate("/quizJS/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {navigate("/quizJS/")}

  return (
    <>
      <Container component="main">
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <Paper
              className="w-responsive text-center mx-auto p-3 mt-2"
              elevation={3}
            >
              <Col sm={12}>
                <Typography fontFamily="'Poppins', sans-serif">
                  Create an Account
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
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        label="Email Address"
                      />
                    </Col>
                  </Form.Group>

                  <Col sm="12">
                    <TextField
                      required
                      fullWidth
                      onChange={(e) => setDisplayName(e.target.value)}
                      name="username"
                      label="Username"
                    />
                  </Col>

                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="12"></Form.Label>
                    <Col sm="12">
                      <TextField
                        required
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        type="password"
                        label="Password"
                      />
                    </Col>
                  </Form.Group>
                  <Button
                    // style={{ backgroundColor: "#1A76D2" }}
                    variant="contained"
                    size="large"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              </Col>
            </Paper>
            <Paper
              className="w-responsive text-center mx-auto p-3 mt-4"
              elevation={3}
            >
              <p>Already have an account?</p>
              <Button
                onClick={handleClick}
                // style={{ backgroundColor: "#1A76D2" }}
                variant="contained"
                size="medium"
              >
                Sign In
              </Button>
            </Paper>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SignUp;
