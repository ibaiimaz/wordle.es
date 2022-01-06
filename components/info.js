import Word from "../components/word";

export default function InfoModal({ closeModal }) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Como jugar</h3>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-lg leading-relaxed">
                Adivina la palabra en seis intentos.
              </p>
              <p className="my-4 text-lg leading-relaxed">
                Después de cada intento, el color de las letras cambia para
                mostrar que tan cerca estás de acertar la palabra.
              </p>
              <Word word="gatos" info="c" />
              <p className="my-4 text-lg leading-relaxed">
                La letra <b>G</b> está en la palabra y en la posición correcta.
              </p>
              <Word word="perro" info="-p" />
              <p className="my-4 text-lg leading-relaxed">
                La letra <b>P</b> está en la palabra pero en la posición
                incorrecta.
              </p>
              <Word word="canto" info="---- " />
              <p className="my-4 text-lg leading-relaxed">
                La letra <b>O</b> no está en la palabra.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
