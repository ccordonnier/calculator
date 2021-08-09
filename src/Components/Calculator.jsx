import React, { useState } from "react";

const Calculator = () => {
  //window.localStorage.clear();

  const [calcul, setCalcul] = useState("");
  const [result, setResult] = useState(0);
  const [newCalcul, setNewCalcul] = useState(true);
  // const [historique, setHistorique] = useState(
  //   JSON.parse(window.localStorage.getItem("historique")) !== null
  //     ? JSON.parse(window.localStorage.getItem("historique"))
  //     : []
  // );
  const [historique, setHistorique] = useState([]);
  //console.log("localstorage", JSON.parse(localStorage.getItem("historique")));
  //console.log("historique", historique);

  //console.log(JSON.parse(window.localStorage.getItem("historique")));

  const buttons = [
    "%",
    "CE",
    "C",
    "<-",
    "1/x",
    "x²",
    "√x",
    "/",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "+/-",
    "0",
    ".",
    "=",
  ];

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

  const operators = [
    "%",
    "CE",
    "C",
    "<-",
    "1/x",
    "x²",
    "√x",
    "/",
    ".",
    "+/-",
    "+",
    "-",
    "x",
  ];

  const handleClick = (button) => {
    switch (button) {
      case "=":
        let calculBis = calcul;

        if (calculBis.includes("²")) {
          while (calculBis.includes("²")) {
            let index = calculBis.indexOf("²");
            let getOperator = false;
            for (let i = index; i >= 0; i--) {
              if (operators.includes(calculBis[i - 1])) {
                getOperator = true;
                let nombre =
                  i !== index - 1
                    ? calculBis.substring(i, index)
                    : calculBis[i];
                calculBis =
                  index === calculBis.length - 1
                    ? calculBis.substring(0, index) + "*" + nombre
                    : calculBis.substring(0, index) +
                      "*" +
                      nombre +
                      calculBis.substring(index + 1, calculBis.length);
                break;
              }
            }
            if (!getOperator) {
              let nombre = calculBis.substring(0, index);
              calculBis =
                index === calculBis.length - 1
                  ? calculBis.substring(0, index) + "*" + nombre
                  : calculBis.substring(0, index) +
                    "*" +
                    nombre +
                    calculBis.substring(index + 1, calculBis.length - 1);
            }
          }
        }

        if (calculBis.includes("√")) {
          while (calculBis.includes("√")) {
            let index = calculBis.indexOf("√");
            let getOperator = false;
            for (let i = index; i <= calculBis.length; i++) {
              if (operators.includes(calculBis[i + 1])) {
                getOperator = true;
                let nombre =
                  i + 1 !== index + 1
                    ? calculBis.substring(index + 1, i + 1)
                    : calculBis[i];

                calculBis =
                  index === calculBis.length
                    ? calculBis.substring(0, index) +
                      "Math.sqrt(" +
                      nombre +
                      ")"
                    : calculBis.substring(0, index) +
                      "Math.sqrt(" +
                      nombre +
                      ")" +
                      calculBis.substring(i + 1);
                console.log("calculBis", calculBis);
                break;
              }
            }
            if (!getOperator) {
              let nombre = calculBis.substring(index + 1, calculBis.length);
              console.log(nombre);
              calculBis =
                calculBis.substring(0, index) + "Math.sqrt(" + nombre + ")";
            }
          }
        }

        let res =
          calculBis === calcul
            ? eval(calcul.replace("x", "*"))
            : eval(calculBis.replace("x", "*"));
        setResult(res);
        setCalcul(calcul);
        setNewCalcul(true);
        setHistorique([{ calcul: calcul + "=", result: res }, ...historique]);
        //window.localStorage.setItem("historique", JSON.stringify(historique));
        break;

      case "<-":
        if (calcul.length) {
          setCalcul(calcul.substring(0, calcul.length - 1));
        }

        break;

      case "C":
      case "CE":
        setResult(0);
        setCalcul("");
        break;

      case "x²":
        if (newCalcul) {
          setCalcul(result + "²");
          setResult(result * result);
        } else {
          setCalcul(calcul + "²");
        }

        break;

      case "√x":
        if (newCalcul) {
          setCalcul("√" + result);
          setResult(Math.sqrt(result));
        } else {
          setCalcul(calcul + "√");
        }
        break;

      default:
        if (newCalcul) {
          if (operators.includes(button)) {
            setCalcul(result + button);
          } else {
            setCalcul(button);
          }

          setNewCalcul(false);
        } else {
          if (operators.includes(button)) {
            if (operators.includes(calcul[calcul.length - 1])) {
              setCalcul(calcul.substring(0, calcul.length - 1) + button);
            } else {
              setCalcul(calcul + button);
            }
          } else {
            setCalcul(calcul + button);
          }
        }
        break;
    }
  };
  return (
    <div className="main">
      <div className="calculator">
        <div className="affichage">
          <div className="calcul">{calcul}</div>
          <div className="result">{result}</div>
        </div>

        <div className="buttons">
          {buttons.map((button, index) => {
            return (
              <button
                className={
                  mainButton.indexOf(button) !== -1
                    ? "main-button"
                    : button === "="
                    ? "egal-button"
                    : ""
                }
                key={index}
                onClick={() => handleClick(button)}
              >
                {button}
              </button>
            );
          })}
        </div>
      </div>
      <div className="historique">
        {historique.length &&
          historique.map((value, index) => {
            return (
              <div>
                {value.calcul}
                <br />
                <span className="result">{value.result}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Calculator;
