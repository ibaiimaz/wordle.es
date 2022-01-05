export default function Letter({ letter, state }) {
  if (state) {
    let color = "bg-absent";

    if (state == "c") {
      color = "bg-correct";
    } else if (state == "p") {
      color = "bg-present";
    }

    return (
      <div
        className={`grid w-16 h-16 uppercase text-4xl font-bold justify-items-center items-center select-none text-white ${color}`}
      >
        {letter}
      </div>
    );
  }

  if (letter === undefined || letter === "") {
    return (
      <div className="grid w-16 h-16 uppercase text-4xl font-bold justify-items-center items-center select-none border-2 border-gray-300">
        {letter}
      </div>
    );
  } else if (letter) {
    return (
      <div className="grid w-16 h-16 uppercase text-4xl font-bold justify-items-center items-center select-none border-2 border-gray-500">
        {letter}
      </div>
    );
  }
}
