import { Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Result.css";

const Result = (props) => {
  const navigate = useNavigate();

  const handleSubmit =  () => {
    const q = query(collection(db, "users"), where("displayName", "==", props.displayName));
    props.setScore(0);

    navigate("/home")
  };


  return (
    <div className="result">
      <span className="title">Final Score : {props.score}</span>
      <div className="resultInfo">

      </div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={handleSubmit}
      >
        Go to homepage
      </Button>
    </div>
  );
};

export default Result;
