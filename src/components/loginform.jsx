import React, { Component, useState, useEffect } from "react";
import { Input } from "./input";
import Joi from "joi-browser";
import auth from "../services/authService";
import { Navigate, useNavigate } from "react-router";

const state = {
  account: { username: "", password: "" },
  errors: {}
};

const LoginForm = () => {
  const [newAccount, setNewAccount] = useState(state.account);
  const [newErrors, setNewErrors] = useState(state.errors);
  const navigate = useNavigate();

  const schema = {
    username: Joi.string()
      .required()
      .min(6)
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
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
      const { username, password } = newAccount;
      //  const { data: JWT } = await login(username, password); //now that we have awaited the promise from our await call, we want to store the JWT
      await auth.login(username, password); // the above line was simplified due to the update in the authService
      // console.log(JWT);
      // localStorage.setItem("token", JWT); // this then stores the key/value pair of token/JWT in local storage
      // navigate("/");
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...newErrors };
        errors.username = ex.response.data;
        setNewErrors(errors);
      }
    }
    console.log("submitted");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          value={newAccount.username}
          label="Username"
          onChange={handleChange}
          error={newErrors.username}
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
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
