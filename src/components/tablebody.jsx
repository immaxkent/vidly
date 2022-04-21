import React, { Component } from "react";
import Like from "./like";
import _ from "lodash";

class TableBody extends React.Component {
  render() {
    const { movies, onDelete, data, columns } = this.props;
    // const { movies, onDelete, sortColumn, onSort } = this.props;

    return (
      // <tbody>
      //   {movies.map(movie => (
      //     <tr key={movie._id}>
      //       <td key={movie.title}>{movie.title}</td>
      //       <td key={movie.genre.name}>{movie.genre.name}</td>
      //       <td key={movie.numberInStock}>{movie.numberInStock}</td>
      //       <td key={movie.dailyRentalRate}>{movie.dailyRentalRate}</td>
      //       <td>
      //         <Like />
      //       </td>
      //       <td key="delete">
      //         <button
      //           onClick={() => onDelete(movie)}
      //           className="btn btn-sm btn-primary"
      //         >
      //           Delete
      //         </button>
      //       </td>
      //     </tr>
      //   ))}
      // </tbody>

      <tbody>
        {data.map(item => (
          <tr>
            {columns.map(column => (
              <td>{_.get(item[column.path])}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
