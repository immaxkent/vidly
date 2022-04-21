// import React, { Component, useState } from "react";
// import Joi from "joi-browser";

// class Form extends Component {
//   state = {
//     account: {},
//     errors: {}
//   };

//   validateProperty = ({ name, value }) => {
//     const obj = { [name]: value };
//     const newSchema = { [name]: schema[name] };
//     const { error } = Joi.validate(obj, newSchema);
//     return error ? error.details[0].message : null;

//     // if (name === "username") {
//     //   if (value.trim() === "") return "Username is required";
//     // }
//     // if (name === "password") {
//     //   if (value.trim() === "") return "Password is required";
//     // }
//   };

//   // useEffect((e) => {

//   // }, [newErrors]);

//   handleChange = e => {
//     // const nextErrors = { ...newErrors };
//     // const errorMessage = validateProperty(e);
//     // if (errorMessage) nextErrors[e.name] = errorMessage;
//     // else delete nextErrors[e.name];

//     const nextAccount = { ...newAccount };
//     nextAccount[e.currentTarget.name] = e.currentTarget.value;
//     console.log(nextAccount);

//     setNewAccount(nextAccount);
//     // setNewErrors(nextErrors);
//   };

//   validate = () => {
//     const result = Joi.validate(newAccount, schema, { abortEarly: false });
//     if (!result.error) return null;

//     const errors = {};
//     for (let item of result.error.details) errors[item.path[0]] = item.message;
//     return errors;

//     // const errors = {};
//     // const thisAccount = newAccount;
//     // if (thisAccount.username.trim() === "")
//     //   errors.username = "Username is required";
//     // if (thisAccount.password.trim() === "")
//     //   errors.password = "Password is required";
//     // return Object.keys(errors).length === 0 ? null : errors;
//   };

//   handleSubmit = e => {
//     e.preventDefault();
//     const errors = validate();
//     setNewErrors(errors || {});
//     if (errors) return;
//     // console.log("submitted");
//   };
// }

// export default Form;
