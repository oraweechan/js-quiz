import { Col, Row, Container, Form } from "react-bootstrap";
import { Typography, Paper, Box} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase/utils";
import {
  signInWithEmailAndPassword, signOut
} from "firebase/auth";
// import UserContext from "./userContext";


const linkStyle = {
  textDecoration: "none",
  color: "white",
};

function Login({user}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [error, setError] = useState();

  // const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(user);
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };



  return (
    <>
  
      <div>
      <h3>Login</h3>
      <Box>
      <TextField

          size="small"      
          placeholder="Email..."
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          />
          <TextField
          size="small"  
          type="password"
          placeholder="Password..."
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          />
          <button onClick={handleSubmit}> Login</button>
      </Box>

      <Box>
        <span>New to Travelgram?</span>

            <Button
              href="signup"
              style={{ backgroundColor: "#1A76D2" }}
              variant="contained"
              size="medium"
            >
                Create an Account
            </Button>
      </Box>  
    </div>

    


    </>
  );
}

export default Login;
