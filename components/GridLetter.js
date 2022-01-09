export default function Letter({ letter, state, size }) {
  const sizeClass = size
    ? `w-full max-w-[${size}] max-h-[${size}] text-4xl`
    : "w-full h-16 text-4xl";

  if (state && state != "-") {
    let color = "bg-absent";

    if (state == "c") {
      color = "bg-correct";
    } else if (state == "p") {
      color = "bg-present";
    }

    return (
      <div
        className={`grid ${sizeClass} uppercase font-bold justify-items-center items-center select-none text-white ${color}`}
      >
        {letter}
      </div>
    );
  }

  if (letter === undefined || letter === "") {
    return (
      <div
        className={`grid ${sizeClass} uppercase font-bold justify-items-center items-center select-none border-2 border-gray-300`}
      >
        {letter}
      </div>
    );
  } else if (letter) {
    return (
      <div
        className={`grid ${sizeClass} uppercase font-bold justify-items-center items-center select-none border-2 border-gray-500`}
      >
        {letter}
      </div>
    );
  }
}
