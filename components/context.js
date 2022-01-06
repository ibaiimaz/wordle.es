import React, { useState } from "react";

const game = {
  target: "",
  setTarget: () => {},
  matrix: [],
  setMatrix: () => {},
  attempts: [],
  setAttempts: () => {},
  tried: [],
  setTried: () => {},
  present: [],
  setPresent: () => {},
  correct: [],
  setCorrect: () => {},
};

export const GameContext = React.createContext({ game });

export const GameContextProvider = (props) => {
  const [target, setTarget] = useState("coche");
  const [matrix, setMatrix] = useState([]);
  const [attempts, setAttempts] = useState([]);
  const [tried, setTried] = useState([]);
  const [present, setPresent] = useState([]);
  const [correct, setCorrect] = useState([]);

  const value = {
    target,
    setTarget,
    matrix,
    setMatrix,
    attempts,
    setAttempts,
    tried,
    setTried,
    present,
    setPresent,
    correct,
    setCorrect,
  };

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
};
