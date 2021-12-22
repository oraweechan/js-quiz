import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs,where, doc,
  query,
  updateDoc, arrayUnion} from "firebase/firestore";
import { db } from "../../firebase/utils";
import "./Result.css";

const Result = (props) => {
  const navigate = useNavigate();
  const [results, setResult] = useState([])

  const handleSubmit = async () => {
    const userDoc = doc(db, "users", props.user.uid);
      // const newFields = results: arrayUnion(`${props.score}`) 
      await updateDoc(userDoc, {
        results: arrayUnion(props.score)
    });
      props.setScore(0)
      navigate("/home")
  };

  useEffect(() => {
    const getResults = async () => {
      const q = query(collection(db, "users"), where("email", "==", props.user.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data().results);
          setResult(doc.data().results)
        });
    }
    getResults()
  }, [])


  return (
    <div className="result">
      <span className="title">Final Score : {props.score}</span>
      <div className="resultInfo">
      {results &&
            results.map((result) => (
              <button
                //   check if selected, if selected call handleSelect.
             
                key={result}
              >
                {result}
              </button>
            ))}

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
