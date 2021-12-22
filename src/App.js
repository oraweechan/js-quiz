import Quiz from "./screens/Quiz/Quiz";
import Result from "./screens/Result/Result";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, getDocs,where, query, } from "firebase/firestore";
import { db, auth } from "../src/firebase/utils";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import SignIn from "./screens/auth/SignIn";
import SignUp from "./screens/auth/SignUp";
import Home from "./screens/Home/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";

function App() {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  const javascriptCollection = collection(db, "questions");
  const reactCollection = collection(db, "react");
  const htmlCssCollection = collection(db, "html_css");

  const apiCall = async (category = "") => {
    if (category == "javascript") {
      const data = await getDocs(javascriptCollection);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else if (category == "react") {
      const data = await getDocs(reactCollection);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } else if (category == "htmlCss") {
      const data = await getDocs(htmlCssCollection);
      setQuestions(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  useEffect(() => {
    const getUser = async () => {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          setDisplayName(doc.data().displayName)
        });
    };
    getUser();
  }, [user]);

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>

        <Header displayName={displayName} user={user}  />
        <Routes>
          <Route path="/quizJS/" element={<SignIn user={user} />} />
          <Route path="/quizJS/signup" element={<SignUp user={user} />} />
          <Route
            path="/quizJS/home"
            element={
              <Home user={user} apiCall={apiCall} questions={questions} />
            }
          />
          <Route
            path="/quizJS/play"
            element={
              <Quiz
                user={user}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                questions={questions}
              />
            }
          />
          <Route path="/quizJS/results" element={<Result questions={questions} user={user} score={score} setScore={setScore}/>} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
