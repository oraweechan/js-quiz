import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/utils";
import {signInWithEmailAndPassword} from "firebase/auth";
import Box from '@mui/material/Box';

function SignIn({user}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate("/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
  
      <div>
      <h3>Sign In</h3>
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
          <button onClick={handleSubmit}> Sign In</button>
      </Box>

      <Box>
        <span>New to QuizJS?</span>

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

export default SignIn;
