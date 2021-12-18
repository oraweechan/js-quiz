
import Intro from "./screens/Start";
import Question from "./screens/Question";
import Result from "./screens/Result";
import { Routes, Route, Link } from "react-router-dom";
import UserContext from "./screens/auth/userContext";
import React, { useState } from "react";



import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });




  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant="h2" fontWeight="bold">
                    Quiz App
          </Typography>

          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="start" element={<Intro />} />
            <Route path="play" element={<Question />} />
            <Route path="results" element={<Result />} />
          </Routes>

        </Box>
      </Container>
    </UserContext.Provider>
 
  );
}

export default App;
