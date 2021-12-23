import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import "./Quiz.css";
import Question from "../../components/Question/Question";

function Quiz(props) {
  const [quizOptions, setQuizOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
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
      {quizOptions ? (
        <>
          <Question
            user={props.user}
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
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
}

export default Quiz;
