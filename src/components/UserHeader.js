import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/utils";
// import "./Header.css";


function UserHeader (props) {
    const navigate = useNavigate();

    const logout = async () => {
      await signOut(auth);
      navigate("/quizJS/");
    };

    return(
        <>
        <Grid
        className="subtitle"
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center">
          <span > Welcome, {props.displayName} </span>
          <button href="/quizJS" onClick={logout}> Sign Out </button>
        </Grid>
        </>

    )
}

export default UserHeader;