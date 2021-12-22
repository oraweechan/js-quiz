import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth,db } from "../firebase/utils";
import { ref, onValue} from "firebase/database";
import { useState, useEffect } from "react";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    where,
    query,
  } from "firebase/firestore";



function Header (props) {
    // console.log(props)
    const navigate = useNavigate();

    const logout = async () => {
      await signOut(auth);
      navigate("/");
    };


    return(
        <>
        <Typography variant="h2" fontWeight="bold">
          Quiz JS
        </Typography>
        <div>
          <h4> User Logged In: </h4>
          {props.user ? props.displayName: null}

          <button href="/" onClick={logout}> Sign Out </button>
        </div>
        </>

    )
}

export default Header;