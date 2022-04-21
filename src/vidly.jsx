import React, { Component } from "react";
import { getMovies } from "./services/fakeMovieService";
import { MoviesTable } from "./components/moviestable";
import Pagination from "./components/pagination";
import { paginate } from "./utils";
import { ListGenre } from "./components/ListGenre";
import { getGenres } from "./services/fakeGenreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import http from "../src/services/httpservice";

class Movies extends React.Component {
  state = {
    movies: [],
    pageSize: 4,
    currentPage: 1,
    genres: [],
    sortColumn: { path: "title", order: "asc" }
  };

  // async componentDidMount() {
  //   const { data } = await http.get("http://localhost:3900/api/genres");
  //   const genres = [...data];
  //   this.setState({
  //     movies: getMovies(),
  //     genres: genres
  //   });
  // }

  async componentDidMount() {
    const { data } = await http.get("http://localhost:3900/api/genres");
    const genres = [...data];

    const { data: movies } = await http.get("http://localhost:3900/api/movies");
    const movieList = [...movies];
    console.log(movieList);

    this.setState({
      movies: movieList,
      genres: genres
    });
  }

  handleDelete = async movie => {
    // console.log("movie deleted", this);
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });
    try {
      await http.delete("http://localhost:3900/api/movies" + "/" + movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("an unexpected error occurred");
      this.setState({ movies: originalMovies });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre });
    this.setState({ currentPage: 1 });
  };

  handleOnSelectAllMovies = () => {
    this.setState({ selectedGenre: null });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  render() {
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;
    const { user } = this.props;

    if (this.state.movies.length === 0)
      return <div style={{ padding: 15 }}>There be no movies to show!</div>;

    const filtered = selectedGenre
      ? this.state.movies.filter(m => m.genre._id === selectedGenre._id)
      : this.state.movies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-2 m-3">
          <ListGenre
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
            onSelectAllMovies={this.handleOnSelectAllMovies}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              style={{ marginTop: 16 }}
              className="btn btn-primary"
              label="New Movie"
            >
              New Movie
            </Link>
          )}

          <div style={{ padding: 15 }}>
            There is a total of {this.state.movies.length} movies in the
            database
          </div>
          <MoviesTable
            user={user}
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemCount={filtered.length}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
