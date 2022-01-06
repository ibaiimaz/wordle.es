import { BeakerIcon } from "@heroicons/react/solid";
import React from "react";
import Hotkeys from "react-hot-keys";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InfoModal from "../components/info";
import Keyboard from "../components/keyboard";
import Word from "../components/word";
import words5 from "../lib/words5";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: true,
      guess: "",
      target: "coche",
      attempts: [],
      matrix: [],
      tried: [],
      present: [],
      correct: [],
      win: false,
    };
  }

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleKey = (keyName) => {
    const { attempts, guess, win } = this.state;

    if (win == false && attempts.length < 6) {
      if (keyName === "return" || keyName === "enter") {
        if (guess.length != 5) {
          toast("No hay suficientes letras para una palabra.");
        } else if (!words5.includes(guess)) {
          toast("La palabra no está en el diccionario.");
        } else {
          this.processWord();
        }
      } else if (keyName === "backspace") {
        if (guess.length > 0) {
          this.setState({
            guess: guess.substring(0, guess.length - 1),
          });
        }
      } else if (guess.length < 5) {
        this.setState({
          guess: guess + keyName,
        });
      }
    }
  };

  processWord = () => {
    const { target, guess } = this.state;

    const info_row = [];

    for (let i = 0; i < target.length; i++) {
      if (guess.charAt(i) == target.charAt(i)) {
        info_row.push("c");
        this.setState({
          correct: [...this.state.correct, guess.charAt(i)],
        });
      } else if (target.includes(guess.charAt(i))) {
        info_row.push("p");
        this.setState({
          present: [...this.state.present, guess.charAt(i)],
        });
      } else {
        info_row.push("-");
        this.setState({
          tried: [...this.state.tried, guess.charAt(i)],
        });
      }
    }

    this.setState({
      matrix: [...this.state.matrix, info_row],
    });

    this.setState({
      attempts: [...this.state.attempts, guess],
      guess: "",
    });

    if (target == guess) {
      this.setState({
        win: true,
      });
    }
  };

  onKeyDown = (keyName, e, handle) => {
    this.handleKey(keyName);
  };

  render() {
    const { showModal, guess, attempts, matrix, tried, present, correct } =
      this.state;

    let { word1, word2, word3, word4, word5, word6 } = ["", "", "", "", "", ""];

    if (attempts.length == 0) {
      word1 = guess;
    } else if (attempts.length == 1) {
      word1 = attempts[0];
      word2 = guess;
    } else if (attempts.length == 2) {
      word1 = attempts[0];
      word2 = attempts[1];
      word3 = guess;
    } else if (attempts.length == 3) {
      word1 = attempts[0];
      word2 = attempts[1];
      word3 = attempts[2];
      word4 = guess;
    } else if (attempts.length == 4) {
      word1 = attempts[0];
      word2 = attempts[1];
      word3 = attempts[2];
      word4 = attempts[3];
      word5 = guess;
    } else if (attempts.length == 5) {
      word1 = attempts[0];
      word2 = attempts[1];
      word3 = attempts[2];
      word4 = attempts[3];
      word5 = attempts[4];
      word6 = guess;
    } else if (attempts.length == 6) {
      word1 = attempts[0];
      word2 = attempts[1];
      word3 = attempts[2];
      word4 = attempts[3];
      word5 = attempts[4];
      word6 = attempts[5];
    }

    return (
      <Hotkeys
        keyName="q,w,e,r,t,y,u,i,o,p,a,s,d,f,g,h,j,k,l,ñ,z,x,c,v,b,n,m,return,space,backspace"
        onKeyDown={this.onKeyDown.bind(this)}
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

          {showModal ? <InfoModal closeModal={this.closeModal} /> : null}

          <div className="flex flex-col h-screen">
            <header>
              <div className="container mx-auto max-w-screen-sm mb-4 py-2 border-b">
                <BeakerIcon className="h-5 w-5 text-blue-500" />
                <div className="text-center">
                  <h1 className="uppercase font-extrabold text-4xl tracking-wider">
                    Wordle.es
                  </h1>
                </div>
              </div>
            </header>

            <div className="container mx-auto my-auto max-w-xs">
              <div className="grid grid-rows-1 grid-flow-row gap-1">
                <Word word={word1} info={matrix[0]} />
                <Word word={word2} info={matrix[1]} />
                <Word word={word3} info={matrix[2]} />
                <Word word={word4} info={matrix[3]} />
                <Word word={word5} info={matrix[4]} />
                <Word word={word6} info={matrix[5]} />
              </div>
            </div>
            <div>
              <Keyboard
                tried={tried}
                present={present}
                correct={correct}
                clickHandler={this.handleKey}
              />
            </div>
          </div>
        </>
      </Hotkeys>
    );
  }
}
