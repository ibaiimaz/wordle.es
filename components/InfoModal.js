import Word from "./GridWord";

export default function InfoModal({ closeModal }) {
  return (
    <>
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative mx-auto w-auto max-w-[450px]">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 pb-0">
              <h3 className="uppercase text-xl text-center font-bold">
                Como jugar
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
              <p className="my-4 text-md">
                Adivina la palabra en seis intentos.
              </p>
              <p className="my-4 text-md">
                Después de cada intento, el color de las letras cambia para
                mostrar que tan cerca estás de acertar la palabra.
              </p>
              <div className="border-b my-4"></div>
              <div>
                <Word word="gatos" info="c" size={12} />
              </div>
              <p className="my-4 text-md">
                La letra <b>G</b> está en la palabra y en la posición correcta.
              </p>

              <Word word="perro" info="-p" size={12} />

              <p className="my-4 text-md">
                La letra <b>E</b> está en la palabra pero en la posición
                incorrecta.
              </p>
              <Word word="canto" info="---- " size={12} />
              <p className="my-4 text-md">
                La letra <b>O</b> no está en la palabra.
              </p>
              <div className="border-b my-4"></div>
            </div>
            {/*footer*/}
            <div className="flex flex-row gap-10 mb-4 px-6">
              <p className="flex-auto my-4 text-md font-bold">
                Una palabra nueva cada día!
              </p>
              <button
                className="bg-correct text-white active:bg-correct font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => closeModal()}
              >
                Jugar!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
