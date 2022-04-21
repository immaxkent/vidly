import React, { Component, useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Input } from "./input";
import Joi from "joi-browser";
// import { getMovies, saveMovie } from "../services/fakeMovieService";
// import { getGenres } from "../services/fakeGenreService";
import http from "../services/httpservice";
import Select from "./select";

const defaultState = {
  data: { title: "", genreId: "", numberInStock: "", rate: "" },
  state: { title: "", genreId: "", numberInStock: "", rate: "" },
  errors: {},
  genres: [],
  movies: getMovies()
};

const MovieForm = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [newData, setNewData] = useState(defaultState.data);
  const [newState, setNewState] = useState(defaultState.state);
  const [newErrors, setNewErrors] = useState(defaultState.errors);
  const [newGenres, setNewGenres] = useState(defaultState.genres);
  const [newMovie, setNewMovie] = useState(defaultState.movies);

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

  useEffect(async () => {
    const { data: genreData } = await http.get(
      "http://localhost:3900/api/genres"
    );
    const genres = [...genreData];
    setNewGenres(genres);

    const movieId = params.id;
    if (movieId === "new") return;

    const { data: movieData } = await http.get(
      `http://localhost:3900/api/movies/${movieId}`
    );

    // const movie = getMovies(movieId);
    if (!movieData) return navigate("/not-found");

    setNewData(movieData);

    setNewState(movieData);
  }, []);

  // const mapToViewModel = movie => {
  //   return {
  //     _id: movie._id,
  //     title: movie.title,
  //     genreId: movie.genre._id,
  //     numberInStock: movie.numberInStock,
  //     dailyRentalRate: movie.dailyRentalRate
  //   };
  // };

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

  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validate();
    // console.log(errors);
    // setNewErrors(errors || {});
    // if (errors) return;
    const thisMovie = {
      title: newState.title,
      genreId: newState.genre._id,
      numberInStock: newState.numberInStock,
      dailyRentalRate: newState.dailyRentalRate
    };
    const { data: movie } = await http.post(
      "http://localhost:3900/api/movies",
      thisMovie
    );
    const movies = [movie, newData];
    setNewState({ movies });
    console.log("submitted");
    navigate("/");
  };

  // VALIDATION:

  const schema = {
    title: Joi.string()
      .required()
      .label("Title"),

    _id: Joi.string(),
    rate: Joi.string(),
    genreId: Joi.string(),

    genre: Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required()
    }),

    // genreId: Joi.string()
    //   .required()
    //   .label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(1)
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

  const renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={newState.genre ? newState.genre._id : null}
        label={label}
        options={options}
        onChange={e => {
          const input = e.currentTarget;
          const nextErrors = { ...newErrors };
          const errorMessage = validateProperty(input);
          if (errorMessage) nextErrors[input.name] = errorMessage;
          else delete nextErrors[input.name];

          const nextGenre = newGenres.find(
            genre => genre._id == e.target.value
          );
          const nextState = { ...newState, genre: nextGenre };
          setNewState(nextState);
        }}
      />
    );
  };

  // console.log("state = new state", newState);
  // console.log("errors", validate());

  return (
    <div>
      <h1>Movie Form </h1>
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
        {renderSelect("genre", "Genre", newGenres)}
        {/* <Input
          type="text"
          name="genreId"
          value={newState.genreId}
          label="Genre"
          onChange={handleChange}
          error={newErrors.genreId}
          // placeholder={newMovie.genre.name || ""}
        /> */}
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
          name="dailyRentalRate"
          value={newState.dailyRentalRate}
          label="Rate"
          onChange={handleChange}
          error={newErrors.dailyRentalRate}
          // placeholder={newMovie.dailyRentalRate || ""}
        />
        <button
          disabled={validate() !== null}
          // to={handleSubmit}
          className="btn btn-primary"
        >
          <Link
            to={handleSubmit}
            // onClick={handleSubmit}
          />
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
