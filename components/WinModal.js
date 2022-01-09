import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTodaysIndex } from "../lib/utils";
import Counter from "./Counter";

export default function WinModal({ matrix, closeModal }) {
  let rows = [];
  let todayIndex = getTodaysIndex();
  let shareTxt = `Wordle (ES) #${todayIndex} ${matrix.length}/6\n\n`;

  for (let i = 0; i < matrix.length; i++) {
    let row = [];

    for (let j = 0; j < matrix[i].length; j++) {
      const state = matrix[i][j];

      if (state == "c") {
        row.push("🟩");
      } else if (state == "p") {
        row.push("🟨");
      } else {
        row.push("⬜");
      }
    }

    rows.push(row);
    rows.push("\n");
    shareTxt = shareTxt + row.join("") + "\n";
  }

  shareTxt = shareTxt + "\nhttps://wordle.danielfrg.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareTxt);
    toast("Resultado copiado al clipboard.");
  };

  return (
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
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto w-[450px]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 pb-0">
              <h3 className="uppercase text-xl text-center font-bold">
                Wordle (ES){"  "}#{todayIndex}
                {"  "}
                {matrix.length}/6
              </h3>
              <button
                className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => closeModal()}
              >
                <span className="leading-[0.25] text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative px-6 flex-auto">
              <p className="my-4 text-md whitespace-pre-line">{rows}</p>
            </div>
            {/*footer*/}
            <div className="flex flex-row p-6 gap-10 border-t border-solid border-blueGray-200">
              <div className="flex flex-col items-center pl-5 pr-10 border-r border-solid border-blueGray-200">
                <p className="mt-2 uppercase font-semibold text-md whitespace-pre-line">
                  Siguiente wordle
                </p>
                <p className="m-2 text-4xl whitespace-pre-line">
                  <Counter />
                </p>
              </div>
              <div className="flex flex-col items-center">
                <button
                  className="w-[100%] bg-correct text-white active:bg-correct font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={copyToClipboard}
                >
                  Compartir
                </button>
                <button
                  className="w-[100%] bg-correct text-white active:bg-correct font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={closeModal ? () => closeModal() : null}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
