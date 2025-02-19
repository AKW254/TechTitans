import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../store/config"; // Import persistor
import Header from "../components/Header";
import Main from "../components/Main";

function Home() {
  const { user,  isAuthenticated} = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  

  useEffect(() => {
    if (!isAuthenticated && persistor.getState().bootstrapped) {
      navigate("/login");
    }
    
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <Header />
      <Main />
    </>
  );
}

export default Home;
