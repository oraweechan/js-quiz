import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/utils";
import UserHeader from "./UserHeader";
// import "./Header.css";


function Header (props) {
    const navigate = useNavigate();

    // const logout = async () => {
    //   await signOut(auth);
    //   navigate("/quizJS/");
    // };

    

    return(
        <>
        <Typography variant="h2" fontWeight="bold">
          Quiz JS
        </Typography>
        {props.user && <UserHeader displayName={props.displayName} user={props.user}/>}
        {/* <UserHeader/> */}

        {/* <div>
          
          <h4> User Logged In: </h4>
          {props.user ? props.displayName: null}

          <button href="/quizJS" onClick={logout}> Sign Out </button>
        </div> */}
        </>

    )
}

export default Header;