import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { GameContextProvider } from "../components/context";
import WordleGrid from "../components/grid";
import InfoModal from "../components/info";
import Keyboard from "../components/keyboard";

export default function Index({}) {
  const [showHelpModal, setShowHelpModal] = useState(false);
  // const game = useContext(GameContext);

  let receiver = (keyName) => {};

  const trigger = (keyName) => {
    receiver && receiver(keyName);
  };

  const receiverCreator = (handler) => {
    receiver = handler;
  };

  return (
    <>
      {showHelpModal ? (
        <InfoModal
          closeModal={() => {
            setShowHelpModal(false);
          }}
        />
      ) : null}

      <GameContextProvider>
        {showHelpModal ? (
          <InfoModal
            closeModal={() => {
              setShowHelpModal(false);
            }}
          />
        ) : null}

        <div className="flex flex-col h-screen">
          <header>
            <div className="flex flex-row mx-auto max-w-screen-sm mb-4 py-2 border-b">
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
            </div>
          </header>

          <WordleGrid receiverCreator={receiverCreator} />

          <div>
            <Keyboard clickHandler={trigger} />
          </div>
        </div>
      </GameContextProvider>
    </>
  );
}
