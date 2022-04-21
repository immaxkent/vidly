import React, { Component } from "react";

const Input = ({ name, label, value, onChange, error, type, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={name}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        error={error}
      >
        {}
      </input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export { Input };
