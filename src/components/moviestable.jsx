import React, { Component } from "react";
import Like from "../components/like";
import TableHeader from "./tableheader";
import TableBody from "./tablebody";
import _ from "lodash";
import { Link, Route, Routes } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends React.Component {
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];

  // constructor() {
  //   const user = auth.getCurrentUser();
  //   if (user && user.isAdmin)
  //   this.columns.push({
  //     key: 'delete',

  //   })
  // }

  render() {
    const { movies, onDelete, sortColumn, onSort, user } = this.props;
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />

        {/* <TableBody movies={movies}
        onDelete={onDelete} /> */}
        <tbody>
          {movies.map(movie => (
            <tr key={movie._id}>
              <td key={movie.title}>
                <Link id={movies._id} to={`/movies/${movie._id}`}>
                  {movie.title}
                </Link>
              </td>
              <td key={movie.genre.name}>{movie.genre.name}</td>
              <td key={movie.numberInStock}>{movie.numberInStock}</td>
              <td key={movie.dailyRentalRate}>{movie.dailyRentalRate}</td>
              <td>
                <Like />
              </td>
              <td key="delete">
                {user && (
                  <button
                    onClick={() => onDelete(movie)}
                    className="btn btn-sm btn-primary"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export { MoviesTable };
