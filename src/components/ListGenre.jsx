import React, { Component, useEffect } from "react";

const ListGenre = props => {
  const { onItemSelect, selectedItem, onSelectAllMovies, items } = props;

  return (
    <ul className="list-group" style={{ minWidth: 120 }}>
      <li
        onClick={() => onSelectAllMovies(selectedItem)}
        key="allGenres"
        className={
          selectedItem === null
            ? "clickable list-group-item active"
            : "clickable list-group-item"
        }
      >
        All Genres
      </li>
      {items.map(genre => (
        <li
          onClick={() => onItemSelect(genre)}
          key={genre._id}
          className={
            genre === selectedItem
              ? "clickable list-group-item active"
              : "clickable list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

ListGenre.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export { ListGenre };
