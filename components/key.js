import { BackspaceIcon } from "@heroicons/react/outline";
import React, { useContext } from "react";
import { GameContext } from "../components/context";

export default function Key({ keyName, clickHandler }) {
  const game = useContext(GameContext);

  let color = "bg-gray-200";

  if (game.correct.includes(keyName)) {
    color = "bg-correct";
  } else if (game.present.includes(keyName)) {
    color = "bg-present";
  } else if (game.tried.includes(keyName)) {
    color = "bg-absent";
  }

  let el = keyName;
  if (keyName == "backspace") {
    el = <BackspaceIcon className="h-6 w-6" />;
  }

  return (
    <button
      className={`rounded uppercase font-bold p-2 min-w-[32px] md:min-w-[45px] h-16 ${color}`}
      onClick={() => {
        clickHandler ? clickHandler(keyName) : null;
      }}
    >
      {el}
    </button>
  );
}
