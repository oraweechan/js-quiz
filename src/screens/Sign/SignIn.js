import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/utils";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Grid, Typography } from "@mui/material";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/quizJS/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    navigate("/quizJS/signup");
  };

  return (
    <>
      <Grid container direction="column">
        <Typography fontSize={18}>Sign in </Typography>
        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="center"
          textAlign="center"
        >
          <TextField
            style={{ width: "80%", background: "#153544" }}
            margin="normal"
            size="small"
            placeholder="Email..."
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <TextField
            style={{ width: "80%", background: "#153544" }}
            size="small"
            type="password"
            placeholder="Password..."
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Grid>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Grid item sx={{ m: 2 }}>
            <Button onClick={handleSubmit} variant="contained" size="medium">
              Sign In
            </Button>
          </Grid>

          <Grid item sx={{ m: 5 }}>
            <Typography>New to QuizJS?</Typography>
            <Button onClick={handleClick} variant="contained" size="small">
              Create an Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SignIn;
