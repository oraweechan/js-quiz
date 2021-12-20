import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import "./Question.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Question(props) {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === props.correct) return "select";
    else if (selected === i && selected !== props.correct) return "wrong";
    else if (i === props.correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === props.correct) props.setScore(props.score + 1);
    setError(false);
  };

  const handleNext = () => {
    if (props.currQues > props.questions.length - 2) {
      if (selected) {
        navigate("/result");
      } else setError("Please select an option first");
    } else if (selected) {
      props.setCurrQues(props.currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleQuit = () => {
    props.setCurrQues(0);
    props.setQuestions();
  };

  return (
    <div>
      <h1>Question {props.currQues + 1}</h1>
      <div className="singleQuestion">
        <h2>{props.questions[props.currQues].question}</h2>
        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {props.quizOptions &&
            props.quizOptions.map((options) => (
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
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/home"
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
