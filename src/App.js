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
  const quizCollection = collection(db, "quizzes");
  const hardCollection = collection(db, "hard_questions");

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  // useEffect(() => {
  //   const apiCall = async () => {
  //     const data = await getDocs(questionCollection);
  //     console.log(data.docs)

  //     setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   apiCall();
  // }, []);

  const apiCall = async (difficulty = "") => {
    console.log(difficulty)
    if (difficulty == "easy") {
      const data = await getDocs(questionCollection);
      console.log(data.docs)
       setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    else if (difficulty == "medium") {
      const data = await getDocs(quizCollection);
      console.log(data.docs)
       setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    else if (difficulty == "hard") {
      const data = await getDocs(hardCollection);
      console.log(data.docs)
       setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    
  };
  // const apiCall = async () => {
  //       const data = await getDocs(questionCollection);
  //       console.log(data.docs)
  //       setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     };



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
            <Route path="home" element={<Home apiCall={apiCall} questions={questions}/>} />
            <Route path="play" element={<Question questions={questions} />} />
            <Route path="results" element={<Result />} />
          </Routes>

        </Box>
      </Container>
    </UserContext.Provider>
 
  );
}

export default App;
