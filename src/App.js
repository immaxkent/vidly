import "./App.css";
import Movies from "./vidly";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import NavBar from "./components/navbar";
import MovieForm from "./components/movieform";
import LoginForm from "./components/loginform";
import Logout from "./components/logout";
import RegisterForm from "./components/registerform";
import { Route, Routes } from "react-router-dom";
import React, { Component, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
// import ProtectedRoute from "./components/protectedRoute";
// import auth from "./services/authService";

const state = {};

function App() {
  const [newUser, setNewUser] = useState(state.user);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      setNewUser(user);
    } catch (ex) {}
    // const user = auth.getCurrentUser();
    // setNewUser(user);
  }, []);

  return (
    <React.Fragment>
      <NavBar user={newUser} />
      <main className="container">
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/movies/:id"
              element={<MovieForm />}
              // render={props => {
              //   if (!newUser) return <Redirect to="/login" />;
              //   return <MovieForm />;
              // }}
            />

            {/* <ProtectedRoute
              path="/movies/:id"
              user={newUser}
              element={MovieForm}
            /> */}
            <Route path="/movies/new" element={<MovieForm />} />
            <Route path="/" element={<Movies user={newUser} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
