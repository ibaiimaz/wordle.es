import Word from "./GridWord";

export default function InfoModal({ closeModal }) {
  return (
    <>
      <div className="container mx-auto max-w-lg h-screen bg-white overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
        <div className="relative mx-auto h-full">
          <div className="flex flex-col w-full h-full outline-none focus:outline-none">
            {/* header */}
            <div className="flex-initial relative m-5">
              <h3 className="flex-auto uppercase text-center text-xl font-bold">
                Como jugar
              </h3>
              <button
                className="absolute top-0 right-0 p-1 ml-auto "
                onClick={() => closeModal()}
              >
                <span className="leading-[0.25] h-5 w-5 text-3xl text-gray-400 block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>

            {/*body*/}
            <div className="flex-auto grow mx-5">
              <p className="my-4 text-md">
                Adivina la palabra en seis intentos.
              </p>
              <p className="my-4 text-md">
                Después de cada intento, el color de las letras cambia para
                mostrar que tan cerca estás de acertar la palabra.
              </p>
              <div className="border-b my-4"></div>
              <div>
                <Word word="gatos" info="c" size="225px" />
              </div>
              <p className="my-4 text-md">
                La letra <b>G</b> está en la palabra y en la posición correcta.
              </p>

              <Word word="vocal" info="--p" size="225px" />

              <p className="my-4 text-md">
                La letra <b>C</b> está en la palabra pero en la posición
                incorrecta.
              </p>
              <Word word="canto" info="---- " size="225px" />
              <p className="my-4 text-md">
                La letra <b>O</b> no está en la palabra.
              </p>
              <div className="border-b my-4"></div>

              {/* bottom */}
              <div className="flex flex-row items-start gap-10 mb-4">
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
      </div>
    </>
  );
}
