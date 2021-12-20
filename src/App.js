
import Intro from "./screens/Start";
import Question from "./screens/Question";
import Result from "./screens/Result";
import { Routes, Route } from "react-router-dom";
import UserContext from "./screens/auth/userContext";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/firebase/utils";

import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Home from "./screens/Home";

function App() {

  const [questions, setQuestions] = useState([]);
  const questionCollection = collection(db, "questions");
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const APIcall = async () => {
      const data = await getDocs(questionCollection);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    APIcall();
  }, []);



  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Container maxWidth="sm">
        <Box textAlign="center" mt={5}>
          <Typography variant="h2" fontWeight="bold">
                    Quiz JS
          </Typography>

          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="home" element={<Home questions={questions}/>} />
            <Route path="start" element={<Intro />} />
            <Route path="play" element={<Question questions={questions} />} />
            <Route path="results" element={<Result />} />
          </Routes>

        </Box>
      </Container>
    </UserContext.Provider>
 
  );
}

export default App;
