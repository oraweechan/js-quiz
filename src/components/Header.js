import { Typography } from "@mui/material";
import UserHeader from "./UserHeader";
import "./Header.css";


function Header (props) {

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