import { useState, useEffect } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./Quiz.css";
import Question from "../../components/Question";


function Quiz(props) {
  // console.log(props.questions);

  const [quizOptions, setQuizOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    // console.log(props.questions[0].options);
    setQuizOptions(
      // check for questions and shuffle options
      props.questions && handleShuffle(props.questions[currQues]?.options)
    );
  }, [currQues, props.questions]);


  const handleShuffle = (options) => {
    return options?.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="Quiz">
      {/* <span className="subtitle">Welcome, name</span> */}
      {quizOptions ? (
        <>
        <div className="quizInfo">
          <span>Score: {props.score}</span>
        </div>

        <Question 
          currQues={currQues}
          setCurrQues={setCurrQues}
          questions={props.questions}
          quizOptions={quizOptions}
          score={props.score}
          setScore={props.setScore}
          setQuestions={props.setQuestions}
          correct={props.questions[currQues]?.correct_option}
        />
        </>
      ): (
        <CircularProgress
          style={{margin: 100}}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}

    </div>
  );
}

export default Quiz;
