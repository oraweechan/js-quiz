import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  collection,
  getDocs,
  where,
  doc,
  query,
  updateDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/utils";
import "./Result.css";

const Result = (props) => {
  // console.log(props.questions.length);
  const navigate = useNavigate();
  const [results, setResult] = useState([]);

  const handleSubmit = async () => {
    const userDoc = doc(db, "users", props.user.uid);
    await updateDoc(userDoc, {
      results: arrayUnion(props.score),
      createdAt: Timestamp.fromDate(new Date()),
    });
    props.setScore(0);
    navigate("/quizJS/home");
  };

  useEffect(() => {
    const getResults = async () => {
      const q = query(
        collection(db, "users"),
        where("email", "==", props.user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().createdAt);
        setResult(doc.data().results.splice(1).reverse());
      });
    };
    getResults();
  }, []);

  return (
    <div className="result">
      <Typography>
        {" "}
        You scored {props.score} out of {props.questions.length}!{" "}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        onClick={handleSubmit}
      >
        Play Again
      </Button>
    </div>
  );
};

export default Result;
