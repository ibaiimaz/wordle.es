export default function Letter({ letter, state }) {
  if (state && state != "-") {
    let color = "bg-absent";

    if (state == "c") {
      color = "bg-correct";
    } else if (state == "p") {
      color = "bg-present";
    }

    return (
      <div
        className={`tile inline-flex w-full text-2xl tiny:text-4xl uppercase font-bold select-none text-white ${color}`}
      >
        {letter}
      </div>
    );
  }

  if (letter === undefined || letter === "") {
    return (
      <div
        className={`tile inline-flex w-full text-2xl tiny:text-4xl uppercase font-bold select-none border-2 border-gray-300`}
      >
        {letter}
      </div>
    );
  } else if (letter) {
    return (
      <div
        className={`tile inline-flex w-full text-2xl tiny:text-4xl uppercase font-bold select-none border-2 border-gray-500`}
      >
        {letter}
      </div>
    );
  }
}
