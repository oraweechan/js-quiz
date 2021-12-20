import { useState, useEffect } from "react";
import { db } from "../firebase/utils";
import { collection, getDocs } from "firebase/firestore";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

function Question(props) {
  console.log(props)
  // const [quiz, setQuiz] = useState([]);
  // const questionCollection = collection(db, "questions");

  // useEffect(() => {
  //   const getQuizzes = async () => {
  //     const data = await getDocs(questionCollection);
  //     console.log(data)
  //     setQuiz(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getQuizzes();
  // }, []);

  
  // const total = quiz.length;

  

  const questions = props.dataList.map((quiz, index) =>{
    const options = props.dataList.incorrectAnswers.map((incorrectAnswers) => {
      const choices = [];
      choices.push(incorrectAnswers)
      return(
        <Box m={2}>
          <Button variant="contained" sx={{display:'block', margin:'0 auto', textAlign:'center', }} >{choices}</Button>
        </Box>
      )
       
    });
    return(
      <>
      <Typography>{index + 1} / </Typography>
      <h1>{quiz.question}</h1>
      {options}
      <Button>Button</Button>
      </>
    )
  });



  return (
    <div className="Question">
            {questions}
           
    </div>
  );
}

export default Question;
