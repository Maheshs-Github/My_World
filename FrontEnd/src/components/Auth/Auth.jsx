import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";

const Auth = () => {
  return (
    <div>
      {/* <h2>In Auth</h2> */}
      <Outlet />
      
    </div>
  );
};

export default Auth;
