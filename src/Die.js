import React from "react";

export default function Die(props) {
  const heldDieStyle = {
    backgroundColor: "#59e391",

    color: "#0b2434",
  };

  const nonHeldDieStyle = {
    backgroundColor: "white",
    color: "#0b2434",
  };

  return (
    <div style={props.isHeld ? heldDieStyle : nonHeldDieStyle} className="die" onClick={props.holdDice}>
      <h2 className="die-value">{props.value}</h2>
    </div>
  );
}

// {props.isHeld ? "die" : "hold-die"}
