import { useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/utils";
import "./Question.css";
import { Container, Row, Col } from "react-bootstrap";
import { Box } from "@mui/system";
import ResultModal from "../ResultModal";

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
        // navigate("/quizJS/results");
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
      <div className="quizInfo">
            
            <Typography style={{color:'#826E00'}} textAlign="left" fontSize={17}>
        Question {props.currQues + 1}
      </Typography>
      <Typography style={{color:'#826E00',}} fontSize={17}>Score: {props.score}</Typography>
            
          </div>
      {/* <Typography textAlign="left" fontSize={25}>
        Question {props.currQues + 1}
      </Typography> */}
      <div className="singleQuestion">
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Grid container  spacing={3}>
          <Grid item xs={12}>
            <Typography style={{padding:15}} fontSize={19}>
              {props.questions[props.currQues].question}
            </Typography>
          </Grid>
         
          <Grid item xs={12}>
            <div className="options">
              {props?.quizOptions?.map((options) => (
                <button
                  //   check if selected, if selected call handleSelect.
                  className={`singleOption  ${
                    selected && handleSelect(options)
                  }`}
                  key={options}
                  onClick={() => handleCheck(options)}
                  disabled={selected}
                  variant="contained"
                >
                  {options}
                </button>
              ))}
            </div>
          </Grid>
        </Grid>

        <div className="controls">
          <Button
            href="/quizJS/"
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            onClick={() => handleQuit()}
          >
            Quit
          </Button>

          {props.currQues > props.questions.length - 2 && selected ? (
            <ResultModal
              questions={props.questions}
              score={props.score}
              setScore={props.setScore}
            />
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Question;
