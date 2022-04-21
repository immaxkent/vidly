import React, { Component, useState, useEffect } from "react";
import { Input } from "./input";
import Joi from "joi-browser";
import { Navigate, useNavigate } from "react-router";
import * as userService from "../services/userService";

const state = {
  account: { email: "", password: "", name: "" },
  errors: {}
};

const apiEnd = "http://localhost:3900/api/users";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [newAccount, setNewAccount] = useState(state.account);
  const [newErrors, setNewErrors] = useState(state.errors);

  const schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
      .min(6),
    name: Joi.string()
      .required()
      .label("Name")
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    return error ? error.details[0].message : null;
  };

  const handleChange = e => {
    const nextAccount = { ...newAccount };
    nextAccount[e.currentTarget.name] = e.currentTarget.value;
    console.log(nextAccount);

    setNewAccount(nextAccount);
  };

  const validate = () => {
    const result = Joi.validate(newAccount, schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    setNewErrors(errors || {});
    if (errors) return;
    try {
      const response = await userService.register(newAccount);
      console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      navigate("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // const errors = { ...newErrors };
        // errors.username = ex.response.data;
        // setNewErrors({ errors });
        alert("user already registered");
      }
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="email"
          value={newAccount.email}
          label="Email"
          onChange={handleChange}
          error={newErrors.email}
          type="text"
        />
        <Input
          type="password"
          name="password"
          value={newAccount.password}
          label="Password"
          onChange={handleChange}
          error={newErrors.password}
        />
        <Input
          type="text"
          name="name"
          value={newAccount.name}
          label="Name"
          onChange={handleChange}
          error={newErrors.name}
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          {/* <Link to="/"></Link> */}
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
