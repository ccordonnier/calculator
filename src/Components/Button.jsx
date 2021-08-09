import React, { useState } from "react";

const Button = (props) => {
  const [calcul, setCalcul] = useState(props.calcul);
  console.log(props);
  const mainButton = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "+/-",
    "0",
    ".",
  ];

  return (
    <button
      className={
        mainButton.indexOf(props.valeur) !== -1
          ? "main-button"
          : props.valeur === "="
          ? "egal-button"
          : ""
      }
      onClick={() => setCalcul(calcul + props.valeur)}
    >
      {props.valeur}
    </button>
  );
};

export default Button;
