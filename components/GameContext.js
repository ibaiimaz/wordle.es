import { DateTime, Duration } from "luxon";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { getTodaysWord } from "../lib/utils";

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
  today: null,
  expires: null,
  processWord: () => {},
};

export const GameContext = React.createContext({ game });

export const GameContextProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["wordle.es-2"]);

  const [target, setTarget] = useState("");
  const [attempts, setAttempts_] = useState([]);
  const [matrix, setMatrix] = useState([]);
  const [tried, setTried] = useState([]);
  const [present, setPresent] = useState([]);
  const [correct, setCorrect] = useState([]);
  const [firstVisit, setFirstVisit_] = useState(false);
  const [won, setWon] = useState(false);
  const [today, setToday] = useState(null);
  const [expires, setExpires] = useState(null);

  const today_ = DateTime.local({ zone: "America/New_York" });
  let dur = Duration.fromObject({ day: 1 });
  let expires_ = today_.plus(dur);
  expires_ = DateTime.fromObject(
    {
      year: expires_.year,
      month: expires_.month,
      day: expires_.day,
    },
    { zone: "America/New_York" }
  );
  // console.log(today_.toISO());
  // console.log(expires_.toISO());

  const setAttempts = (value) => {
    setAttempts_(value);
    setCookie("attempts", value, {
      path: "/",
      secure: true,
      expires: expires_.toJSDate(),
    });
  };
  const setFirstVisit = (value) => {
    setFirstVisit_(value);
    setCookie("first_visit", value, {
      path: "/",
      secure: true,
      // expires: new Date("2022-01-08T12:30"),
    });
  };

  const processWord_ = (word, target_) => {
    const newRow = ["x", "x", "x", "x", "x"];
    const newTried = [];
    const newPresent = [];
    const newCorrect = [];
    let target2 = target || target_;

    // Update letters
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);

      if (char == target2.charAt(i)) {
        newRow[i] = "c";
        newCorrect.push(char);
      } else if (target2.includes(char)) {
        newPresent.push(char);
      } else {
        newTried.push(char);
      }
    }

    // Update present state
    // remove correct chars from present chars
    for (let i = 0; i < newCorrect.length; i++) {
      const correctChar = newCorrect[i];
      target2 = target2.replace(correctChar, "_");
    }

    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      // console.log("i:", i);
      // console.log("target2:", target2);
      // console.log("char:", char);
      // console.log("word:", word);

      if (newRow[i] == "x" && target2.includes(char)) {
        newRow[i] = "p";
        target2 = target2.replace(char, "_");
      }
    }

    return { newRow, newTried, newPresent, newCorrect };
  };

  const processWord = (word) => {
    if (!won) {
      const { newRow, newTried, newPresent, newCorrect } = processWord_(word);

      setAttempts([...attempts, word]);
      setMatrix([...matrix, newRow]);
      setTried([...tried, ...newTried]);
      setPresent([...present, ...newPresent]);
      setCorrect([...correct, ...newCorrect]);

      if (word == target) {
        setWon(true);
      }
    }
  };

  useEffect(() => {
    // Set word to the day
    const todaysWord = getTodaysWord(today_);
    setTarget(todaysWord);

    // Load and process values from cookies
    if (cookies.attempts) {
      let cMatrix = [];
      let cTried = [];
      let cPresent = [];
      let cCorrect = [];

      for (let i = 0; i < cookies.attempts.length; i++) {
        const word = cookies.attempts[i];
        const { newRow, newTried, newPresent, newCorrect } = processWord_(
          word,
          todaysWord
        );

        cMatrix = [...cMatrix, newRow];
        cTried = [...cTried, ...newTried];
        cPresent = [...cPresent, ...newPresent];
        cCorrect = [...cCorrect, ...newCorrect];

        if (word == todaysWord) {
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

    setExpires(today_);
    setExpires(expires_);
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
    today,
    expires,
    processWord,
  };

  return (
    <GameContext.Provider value={values}>{props.children}</GameContext.Provider>
  );
};
