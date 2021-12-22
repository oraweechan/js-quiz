import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/utils";
import "./Question.css";

function Question(props) {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (options) => {
    if (selected === options && selected === props.correct) return "select";
    else if (selected === options && selected !== props.correct) return "wrong";
    else if (options === props.correct) return "select";
  };

  const handleCheck = (option) => {
    setSelected(option);
    if (option === props.correct) props.setScore(props.score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (props.currQues > props.questions.length - 2) {
      if (selected) {
        navigate("/quizJS/results");
      } else setError("Please select an option first");
    } else if (selected) {
      props.setCurrQues(props.currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = async () => {
    props.setCurrQues(0);
    props.setQuestions();
    await signOut(auth);
  };

  return (
    <div>
      <h1>Question {props.currQues + 1}</h1>
      <div className="singleQuestion">
        
        <div className="options">
          <h2>{props.questions[props.currQues].question}</h2>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {props?.quizOptions?.map((options) => (
              <button
                //   check if selected, if selected call handleSelect.
                className={`singleOption  ${selected && handleSelect(options)}`}
                key={options}
                onClick={() => handleCheck(options)}
                disabled={selected}
              >
                {options}
              </button>
            ))}
        </div>
        <div className="controls">
          <Button
            href="/quizJS/home"
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {props.currQues > props.questions.length - 2
              ? "Submit"
              : "Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Question;
