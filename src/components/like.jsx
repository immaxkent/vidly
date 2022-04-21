import React, { Component, useState } from "react";

const defaultState = "btn btn-sm";
function Like() {
  const [classes, setClasses] = useState(defaultState);

  const handleLike = () => {
    if (classes === "btn btn-sm") {
      const newClasses = "btn btn-sm btn-danger";
      setClasses(newClasses);
    } else {
      const originalClasses = "btn btn-sm";
      setClasses(originalClasses);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          handleLike();
        }}
        className={classes}
      >
        <i className="fa-thin fa-heart"></i>
      </button>
    </div>
  );
}

export default Like;
