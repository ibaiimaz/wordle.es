import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./GameContext";

export default function Counter() {
  const [time, setTime] = useState(DateTime.local());
  const game = useContext(GameContext);

  useEffect(() => {
    const interval = setInterval(() => setTime(DateTime.local()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const diff = game.expires.diff(time, ["hours", "minutes", "seconds"]);

  const hours = String(parseInt(diff.hours)).padStart(2, "0");
  const minutes = String(parseInt(diff.minutes)).padStart(2, "0");
  const seconds = String(parseInt(diff.seconds)).padStart(2, "0");

  return <span>{`${hours}:${minutes}:${seconds}`}</span>;
}
