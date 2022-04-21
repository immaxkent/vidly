import React, { Component, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Input } from "./input";
import Joi from "joi-browser";
import { getMovies, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

const state = {
  data: { title: "", genreId: "", numberInStock: "", rate: "" },
  state: { title: "", genreId: "", numberInStock: "", rate: "" },
  errors: {},
  genres: [],
  movies: getMovies()
};

const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [newData, setNewData] = useState(state.data);
  const [newState, setNewState] = useState(state.state);
  const [newErrors, setNewErrors] = useState(state.errors);
  const [newGenres, setNewGenres] = useState(state.genres);
  const [newMovie, setNewMovie] = useState(state.movies);

  // useEffect(() => {
  //   setNewErrors(validate());
  // }, [validate()]);

  // useRef(() => {
  //   const movie = newMovie.filter(movie => {
  //     if (movie._id === params.id)
  //       return {
  //         _id: movie._id,
  //         title: movie.title,
  //         genreId: movie.genre._id,
  //         numberInStock: movie.numberInStock,
  //         dailyRentalRate: movie.dailyRentalRate
  //       };
  //   });

  //   // if (movie._id === params.id);
  //   setNewState(movie);
  // });

  useEffect(() => {
    const genres = getGenres();
    setNewGenres(genres);

    const movieId = params.id;
    if (movieId === "new") return;

    const movie = getMovies(movieId);
    if (!movie) return navigate("/not-found");

    setNewData(mapToViewModel(movie));
  }, []);

  const mapToViewModel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };

  // HANDLERS

  const handleChange = ({ currentTarget: input }) => {
    const nextErrors = { ...newErrors };
    const errorMessage = validateProperty(input);
    if (errorMessage) nextErrors[input.name] = errorMessage;
    else delete nextErrors[input.name];

    const nextState = { ...newState };
    nextState[input.name] = input.value;
    console.log(nextState);
    setNewState(nextState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    // console.log(errors);
    // setNewErrors(errors || {});
    if (errors) return;
    console.log("submitted");
    navigate("/");
  };

  // VALIDATION:

  const schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    rate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Rate")
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema, { abortEarly: true });
    // console.log({ error });
    // setNewErrors({ ...error });
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const result = Joi.validate(newState, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    console.log(errors);
    return errors;
  };

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setNewErrors(validate() || {});
    }
  }, [newState]);

  // useEffect(() => {
  //   if (initialRender) {
  //     const movie = newMovie.filter(movie => {
  //       if (movie._id === params.id)
  //         return {
  //           _id: movie._id,
  //           title: movie.title,
  //           genreId: movie.genre._id,
  //           numberInStock: movie.numberInStock,
  //           dailyRentalRate: movie.dailyRentalRate
  //         };
  //     });

  //     // if (movie._id === params.id);
  //     setNewState(movie);
  //   }
  // });

  return (
    <div>
      <h1>Movie Form {params.id}</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={newState.title}
          label="Title"
          onChange={handleChange}
          error={newErrors.title}
          // placeholder={`${movie.title}`}
        />
        <Input
          type="text"
          name="genreId"
          value={newState.genreId}
          label="Genre"
          onChange={handleChange}
          error={newErrors.genreId}
          // placeholder={newMovie.genre.name || ""}
        />
        <Input
          type="number"
          name="numberInStock"
          value={newState.numberInStock}
          label="Number In Stock"
          onChange={handleChange}
          error={newErrors.numberInStock}
          // placeholder={newMovie.numberInStock || ""}
        />
        <Input
          type="number"
          name="rate"
          value={newState.rate}
          label="Rate"
          onChange={handleChange}
          error={newErrors.rate}
          // placeholder={newMovie.dailyRentalRate || ""}
        />
        <button
          disabled={validate()}
          // to={handleSubmit}
          className="btn btn-primary"
        >
          <Link to={handleSubmit} />
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
