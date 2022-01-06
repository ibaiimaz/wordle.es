import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WinModal({ matrix, closeModal }) {
  let rows = [];
  let shareTxt = `Wordle (ES)   ${matrix.length}/6\n\n`;

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
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Felicidades!</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-lg leading-relaxed">
                <a href="https://wordle.danielfrg.com">Wordle (ES)</a>
                {"  "}
                {matrix.length}/6
              </p>

              <p className="my-4 text-lg leading-relaxed whitespace-pre-line">
                {rows}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-correct text-white active:bg-correct font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={copyToClipboard}
              >
                Compartir
              </button>
              <button
                className="bg-correct text-white active:bg-correct font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeModal ? () => closeModal() : null}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
