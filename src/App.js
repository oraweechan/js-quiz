import Quiz from "./screens/Quiz/Quiz";
import Result from "./screens/Result/Result";
import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db, auth } from "../src/firebase/utils";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import SignIn from "./screens/Sign/SignIn";
import SignUp from "./screens/Sign/SignUp";
import Home from "./screens/Home/Home";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";
import "./App.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#D06F4D'
    },
    text: {
      primary: '#FFFFFF'
    },
    background: {
      default: '#153544',
      paper:'#153544'
    }

  }
})

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
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setDisplayName(doc.data().displayName);
      });
    };
    getUser();
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
      <Box 
      sx={{
       
      }}
      textAlign="center" mt={2}>
        
        <Header displayName={displayName} user={user} />
        <Routes>
          <Route path="/quizJS/" element={<SignIn />} />
          <Route path="/quizJS/signup" element={<SignUp />} />
          <Route
            path="/quizJS/home"
            element={<Home apiCall={apiCall} questions={questions} />}
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
          <Route
            path="/quizJS/results"
            element={
              <Result
                questions={questions}
                user={user}
                score={score}
                setScore={setScore}
              />
            }
          />
        </Routes>
        {/* <Footer/> */}

        
      </Box>
    </Container>

    </ThemeProvider>
    
  );
}

export default App;
