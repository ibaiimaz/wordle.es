import { DateTime } from "luxon";
import React, { useContext, useEffect, useState } from "react";
import { GameContext, getEndTimeForDate } from "./GameContext";

export default function Counter() {
  const [time, setTime] = useState(
    DateTime.local({ zone: "America/New_York" })
  );
  const game = useContext(GameContext);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = DateTime.local({ zone: "America/New_York" });
      setTime(now);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const endDate = getEndTimeForDate(time);
  const diff = endDate.diff(time, ["hours", "minutes", "seconds"]);

  const hours = String(parseInt(diff.hours)).padStart(2, "0");
  const minutes = String(parseInt(diff.minutes)).padStart(2, "0");
  const seconds = String(parseInt(diff.seconds)).padStart(2, "0");

  return <span>{`${hours}:${minutes}:${seconds}`}</span>;
}
