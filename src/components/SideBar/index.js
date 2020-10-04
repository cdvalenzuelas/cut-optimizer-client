// Dependencies
import React from "react";

// Hooks
import useButtons from "./useButtons";

import "./styles.scss";

import ShapeInfo from "../ShapeInfo";

const SideBar = () => {
  const {
    handleChange,
    request,
    mode,
    currentShape,
    shapeError,
  } = useButtons();

  return (
    <aside className="SideBar">
      <div className="SideBar-Shapes">
        {request.map((item, index) => {
          const className =
            index === currentShape ? "shapeInfo-selected" : "shapeInfo";
          const style =
            shapeError[index] === 0
              ? { borderLeft: "0.5rem solid var(--prymary)" }
              : { borderLeft: "0.5rem solid var(--tertiary)" };

          return (
            <ShapeInfo
              key={index}
              index={index}
              handleChange={handleChange}
              className={className}
              style={style}
            />
          );
        })}
      </div>
      {mode === "input" && (
        <div className="actionsButtons">
          <button className="btn-main" name="newShape" onClick={handleChange}>
            New
          </button>
          <button className="btn-main" name="optimize" onClick={handleChange}>
            Optimize
          </button>
        </div>
      )}
      {mode === "output" && (
        <div className="actionsButtons">
          <button className="btn-main" name="edit" onClick={handleChange}>
            Edit
          </button>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
