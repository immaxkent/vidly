import React, { Component, useEffect } from "react";
import { useNavigate } from "react-router";
import auth from "../services/authService";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage.removeItem("token");
    auth.logout();
    // navigate("/");
    window.location = "/";
  });
  return null;
};

export default Logout;
