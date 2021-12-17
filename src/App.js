import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Question from "./pages/Question";
import Result from "./pages/Result";

import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";


function App() {
  return (
    <Router>
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h2" fontWeight="bold">
                  Quiz App
        </Typography>
        
        <Intro/>
        <Question/>
        <Result/>
  
      </Box>
    </Container>
  </Router>
  );
}

export default App;
