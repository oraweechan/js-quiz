import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Form } from "react-bootstrap";
import { TextField, Grid } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/utils";
import { doc, setDoc } from "firebase/firestore";

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
        results: [""],
      });
      navigate("/quizJS/home");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClick = () => {
    navigate("/quizJS/");
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Grid container direction="column">
          <Typography fontSize={18}>Create an Account </Typography>
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
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              style={{ width: "80%", background: "#153544" }}
              margin="normal"
              size="small"
              placeholder="Username..."
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <TextField
              style={{ width: "80%", background: "#153544" }}
              margin="normal"
              size="small"
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
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
              <Button variant="contained" size="large" type="submit">
                Submit
              </Button>
            </Grid>

            <Grid item sx={{ m: 5 }}>
              <Typography>Already have an account?</Typography>
              <Button onClick={handleClick} variant="contained" size="medium">
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}

export default SignUp;
