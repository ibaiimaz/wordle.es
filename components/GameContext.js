import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const game = {
  target: "",
  setTarget: () => {},
  attempts: [],
  setAttempts: () => {},
  matrix: [],
  setTried: () => {},
  tried: [],
  setMatrix: () => {},
  present: [],
  setPresent: () => {},
  correct: [],
  setCorrect: () => {},
  firstVisit: false,
  setFirstVisit: () => {},
  won: false,
  setWon: () => {},
  processWord: () => {},
};

export const GameContext = React.createContext({ game });

export const GameContextProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["wordle.es"]);

  const [target, setTarget] = useState("hueso");
  const [attempts, setAttempts_] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [tried, setTried] = useState([]);
  const [present, setPresent] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [firstVisit, setFirstVisit_] = useState(false);
  const [won, setWon] = useState(false);

  const setAttempts = (value) => {
    setAttempts_(value);
    setCookie("attempts", value, { path: "/", secure: true });
  };
  const setFirstVisit = (value) => {
    setFirstVisit_(value);
    setCookie("first_visit", value, { path: "/", secure: true });
  };

  const processWord_ = (word) => {
    const newState = [];
    const newTried = [];
    const newPresent = [];
    const newCorrect = [];

    for (let i = 0; i < target.length; i++) {
      if (word.charAt(i) == target.charAt(i)) {
        newState.push("c");
        newCorrect.push(word.charAt(i));
      } else if (target.includes(word.charAt(i))) {
        newState.push("p");
        newPresent.push(word.charAt(i));
      } else {
        newState.push("i");
        newTried.push(word.charAt(i));
      }
    }

    return { newState, newTried, newPresent, newCorrect };
  };

  const processWord = (word) => {
    if (!won) {
      const { newState, newTried, newPresent, newCorrect } = processWord_(word);

      setAttempts([...attempts, word]);
      setMatrix([...matrix, newState]);
      setTried([...tried, ...newTried]);
      setPresent([...present, ...newPresent]);
      setCorrect([...correct, ...newCorrect]);

      if (word == target) {
        setWon(true);
      }
    }
  };

  useEffect(() => {
    // Load and process values from cookies
    if (cookies.attempts) {
      let cMatrix = [];
      let cTried = [];
      let cPresent = [];
      let cCorrect = [];

      for (let i = 0; i < cookies.attempts.length; i++) {
        const word = cookies.attempts[i];
        const { newState, newTried, newPresent, newCorrect } =
          processWord_(word);
        cMatrix = [...cMatrix, newState];
        cTried = [...cTried, ...newTried];
        cPresent = [...cPresent, ...newPresent];
        cCorrect = [...cCorrect, ...newCorrect];

        if (word == target) {
          setWon(true);
        }
      }

      setAttempts(cookies.attempts);
      setMatrix(cMatrix);
      setTried(cTried);
      setPresent(cPresent);
      setCorrect(cCorrect);
    }

    if (!cookies.first_visit) {
      setFirstVisit(true);
    }
  }, []);

  const values = {
    target,
    setTarget,
    attempts,
    setAttempts,
    matrix,
    setMatrix,
    tried,
    setTried,
    present,
    setPresent,
    correct,
    setCorrect,
    firstVisit,
    setFirstVisit,
    won,
    setWon,
    processWord,
  };

  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};
