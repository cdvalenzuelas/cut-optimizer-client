import React from "react";

import "./styles.scss";

const ShapeInfo = ({ index, handleChange, className, style }) => {
  return (
    <button
      value={`${index}`}
      onClick={handleChange}
      name="shapeInfo"
      className={className}
      style={style}
    >
      <h3>
        {index + 1}. {item.shapeName}
      </h3>
      <span>{item.material}</span>
    </button>
  );
};

export default ShapeInfo;
