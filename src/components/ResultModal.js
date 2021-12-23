import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router";
import {
    doc,
    updateDoc,
    arrayUnion,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "../firebase/utils";


const style = {
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};

export default function ResultModal(props) {
    console.log(props)
  const navigate = useNavigate();

//   const handleSubmit = async () => {
//     props.setScore(0);
//     navigate("/quizJS/home");
//   };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    const userDoc = doc(db, "users", props.user.uid);
    await updateDoc(userDoc, {
      results: arrayUnion(props.score),
      createdAt: Timestamp.fromDate(new Date()),
    });
    props.setScore(0);
    navigate("/quizJS/home");
  };


  return (
    <div>
      <Button
        style={{ width: 185 }}
        variant="contained"
        size="large"
        onClick={handleOpen}
      >
        Submit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You scored {props.score} out of {props.questions.length}!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              style={{ alignSelf: "center", marginTop: 20 }}
              onClick={handleSubmit}
            >
              Play Again
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
