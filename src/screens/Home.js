import { MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

import "./Home.css";

function Home(props) {
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);

    const navigate = useNavigate();


    const handleSubmit = () => {
        // console.log({difficulty})
        if (!difficulty) {
          setError(true);
          return;
        } else {
          setError(false);
          props.apiCall(difficulty);
        //   navigate('/play');
      }};
  
  
    return (
        <div className="content">
            <div className="settings">
                <Typography>Settings</Typography>
                <div className="settings_select">
                    {error && <ErrorMessage>Please fill all the fields</ErrorMessage>}
             
                    {/* <TextField
                        style={{ marginBottom: 25 }}
                        label="Enter Your Name"
                        variant="outlined"
                    /> */}

                    {/* UPDATE IF TIME FOR CATEGORIES
                    <TextField
                        select
                        label="Select Difficulty"
                        variant="outlined"
                        style={{ marginBottom: 30 }}
                    >
                    {
                        props.dataList.map((question) => (
                            <MenuItem key={question.difficulty} value={question.value} > {question.difficulty} </MenuItem>

                        ))
                    }
                    </TextField> */}

                        <TextField
                                    select
                                    label="Select Difficulty"
                                    value={difficulty}
                                    onChange={(e) => setDifficulty(e.target.value)}
                                    variant="outlined"
                                    style={{ marginBottom: 30 }}
                                >
                                    <MenuItem key="Easy" value="easy">
                                    Easy
                                    </MenuItem>
                                    <MenuItem key="Medium" value="medium">
                                    Medium
                                    </MenuItem>
                                    <MenuItem key="Hard" value="hard">
                                    Hard
                                    </MenuItem>
                                </TextField>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={handleSubmit}
                                >
                                    Start Quiz
                                </Button>

                    




                </div>
            </div>
        </div>
  
   
    );
  }
  
  export default Home;
  