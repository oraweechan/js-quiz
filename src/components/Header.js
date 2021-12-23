import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/utils";
import UserHeader from "./UserHeader";
import "./Header.css";


function Header (props) {
    const navigate = useNavigate();

    // const logout = async () => {
    //   await signOut(auth);
    //   navigate("/quizJS/");
    // };

    

    return(
        <>
        <Typography style={{color:'#D06F4D'}} variant="h2" fontWeight="bold">
          Quiz<span className="jsTitle">JS</span>
        </Typography>
        {props.user && <UserHeader displayName={props.displayName} user={props.user}/>}
        </>

    )
}

export default Header;