import React, { useContext, useState } from "react";
import Hotkeys from "react-hot-keys";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GameContext } from "../components/context";
import Word from "../components/word";
import words5 from "../lib/words5";

export default function WordleGrid({}) {
  const [guess, setGuess] = useState("");
  const [won, setWon] = useState(false);

  const game = useContext(GameContext);

  const processWord = () => {
    // if (!won) {
    const info_row = [];

    for (let i = 0; i < game.target.length; i++) {
      if (guess.charAt(i) == game.target.charAt(i)) {
        info_row.push("c");
        game.setCorrect([...game.correct, guess.charAt(i)]);
      } else if (game.target.includes(guess.charAt(i))) {
        info_row.push("p");
        game.setPresent([...game.present, guess.charAt(i)]);
      } else {
        info_row.push("i");
        game.setTried([...game.tried, guess.charAt(i)]);
      }
    }

    setGuess("");
    game.setMatrix([...game.matrix, info_row]);
    game.setAttempts([...game.attempts, guess]);
    if (game.target == guess) {
      setWon(true);
    }
    // }
  };

  const handleKey = (keyName) => {
    if (won == false && game.attempts.length < 6) {
      if (keyName === "return" || keyName === "enter") {
        if (guess.length != 5) {
          toast("No hay suficientes letras para una palabra.");
        } else if (!words5.includes(guess)) {
          toast("La palabra no está en el diccionario.");
        } else {
          processWord();
        }
      } else if (keyName === "backspace") {
        if (guess.length > 0) {
          setGuess(guess.substring(0, guess.length - 1));
        }
      } else if (guess.length < 5) {
        setGuess(guess + keyName);
      }
    }
  };

  const onKeyDown = (keyName, e, handle) => {
    handleKey(keyName);
  };

  let { word1, word2, word3, word4, word5, word6 } = ["", "", "", "", "", ""];

  if (game.attempts.length == 0) {
    word1 = guess;
  } else if (game.attempts.length == 1) {
    word1 = game.attempts[0];
    word2 = guess;
  } else if (game.attempts.length == 2) {
    word1 = game.attempts[0];
    word2 = game.attempts[1];
    word3 = guess;
  } else if (game.attempts.length == 3) {
    word1 = game.attempts[0];
    word2 = game.attempts[1];
    word3 = game.attempts[2];
    word4 = guess;
  } else if (game.attempts.length == 4) {
    word1 = game.attempts[0];
    word2 = game.attempts[1];
    word3 = game.attempts[2];
    word4 = game.attempts[3];
    word5 = guess;
  } else if (game.attempts.length == 5) {
    word1 = game.attempts[0];
    word2 = game.attempts[1];
    word3 = game.attempts[2];
    word4 = game.attempts[3];
    word5 = game.attempts[4];
    word6 = guess;
  } else if (game.attempts.length == 6) {
    word1 = game.attempts[0];
    word2 = game.attempts[1];
    word3 = game.attempts[2];
    word4 = game.attempts[3];
    word5 = game.attempts[4];
    word6 = game.attempts[5];
  }

  return (
    <Hotkeys
      keyName="q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,ñ,z,x,c,v,b,n,m,return,space,backspace"
      onKeyDown={onKeyDown.bind(this)}
      // onKeyUp={this.onKeyUp.bind(this)}
    >
      <>
        <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          closeButton={false}
          theme="dark"
        />

        <div className="container mx-auto my-auto max-w-xs">
          <div className="grid grid-rows-1 grid-flow-row gap-1">
            <Word word={word1} info={game.matrix[0]} />
            <Word word={word2} info={game.matrix[1]} />
            <Word word={word3} info={game.matrix[2]} />
            <Word word={word4} info={game.matrix[3]} />
            <Word word={word5} info={game.matrix[4]} />
            <Word word={word6} info={game.matrix[5]} />
          </div>
        </div>
      </>
    </Hotkeys>
  );
}
