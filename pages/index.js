import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import React, { useContext, useState } from "react";
import { GameContext } from "../components/GameContext";
import WordleGrid from "../components/GridGame";
import InfoModal from "../components/InfoModal";
import Keyboard from "../components/KeyboardUI";

export default function Index({}) {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const game = useContext(GameContext);

  // Link sibling components
  let receiver = (keyName) => {};

  const trigger = (keyName) => {
    receiver && receiver(keyName);
  };

  const receiverCreator = (handler) => {
    receiver = handler;
  };

  return (
    <>
      {showHelpModal || game.gameStatus == "NEW" ? (
        <InfoModal
          closeModal={() => {
            setShowHelpModal(false);
            if (game.gameStatus == "NEW") {
              game.setGameStatus("PLAYING");
              game.saveGame();
            }
          }}
        />
      ) : null}

      <div className="flex flex-col h-screen">
        <header>
          <div className="flex flex-row mx-2 sm:mx-auto max-w-screen-sm py-2 border-b">
            <button
              className="my-2 flex-none"
              onClick={() => {
                setShowHelpModal(true);
              }}
            >
              <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
            </button>

            <div className="flex-auto text-center">
              <h1 className="uppercase font-extrabold text-4xl tracking-wider">
                Wordle.es
              </h1>
            </div>

            <QuestionMarkCircleIcon className="h-6 w-6 text-white" />
          </div>
        </header>

        <WordleGrid receiverCreator={receiverCreator} />
        <Keyboard clickHandler={trigger} />
      </div>
    </>
  );
}
