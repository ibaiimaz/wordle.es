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
  const [cookies, setCookie, removeCookie] = useCookies(["wordle.es"]);

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

  const today_ = DateTime.local();
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
    const newState = [];
    const newTried = [];
    const newPresent = [];
    const newCorrect = [];
    const target2 = target || target_;

    for (let i = 0; i < target2.length; i++) {
      if (word.charAt(i) == target2.charAt(i)) {
        newState.push("c");
        newCorrect.push(word.charAt(i));
      } else if (target2.includes(word.charAt(i))) {
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
    const todaysWord = getTodaysWord(today_);
    setTarget(todaysWord);

    if (cookies.attempts) {
      let cMatrix = [];
      let cTried = [];
      let cPresent = [];
      let cCorrect = [];

      for (let i = 0; i < cookies.attempts.length; i++) {
        const word = cookies.attempts[i];
        const { newState, newTried, newPresent, newCorrect } = processWord_(
          word,
          todaysWord
        );

        console.log(word);
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
