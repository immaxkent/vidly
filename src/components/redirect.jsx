import React, { Component } from "react";
import { useNavigate } from "react-router";

const Redirect = () => {
  const navigate = useNavigate();
  return navigate("/login");
};

export default Redirect;
