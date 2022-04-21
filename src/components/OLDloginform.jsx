// original form;

import React, { Component, useState, useEffect } from "react";
import { Input } from "./input";
import Joi from "joi-browser";

const state = {
  account: { username: "", password: "" },
  errors: {}
};

const LoginForm = () => {
  const [newAccount, setNewAccount] = useState(state.account);
  const [newErrors, setNewErrors] = useState(state.errors);

  const schema = {
    username: Joi.string()
      .required()
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

    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    // }
    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
  };

  // useEffect((e) => {

  // }, [newErrors]);

  const handleChange = e => {
    // const nextErrors = { ...newErrors };
    // const errorMessage = validateProperty(e);
    // if (errorMessage) nextErrors[e.name] = errorMessage;
    // else delete nextErrors[e.name];

    const nextAccount = { ...newAccount };
    nextAccount[e.currentTarget.name] = e.currentTarget.value;
    console.log(nextAccount);

    setNewAccount(nextAccount);
    // setNewErrors(nextErrors);
  };

  const validate = () => {
    const result = Joi.validate(newAccount, schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;

    // const errors = {};
    // const thisAccount = newAccount;
    // if (thisAccount.username.trim() === "")
    //   errors.username = "Username is required";
    // if (thisAccount.password.trim() === "")
    //   errors.password = "Password is required";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setNewErrors(errors || {});
    if (errors) return;
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
          //so here, when the form is complete,
          //the errors object is empty and returns undefined...
          //need some sort of error handling
        />
        <Input
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

// updated form with form.jsx input

import React, { Component, useState, useEffect } from "react";
import { Input } from "./input";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    account: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  render() {
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
            //so here, when the form is complete,
            //the errors object is empty and returns undefined...
            //need some sort of error handling
          />
          <Input
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
  }
}

export default LoginForm;
