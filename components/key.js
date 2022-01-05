export default function Key({ letter, tried, present, correct, clickHandler }) {
  let color = "bg-gray-200";

  if (correct && correct.includes(letter)) {
    color = "bg-correct";
  } else if (present && present.includes(letter)) {
    color = "bg-present";
  } else if (tried && tried.includes(letter)) {
    color = "bg-absent";
  }

  return (
    <button
      className={`rounded uppercase font-bold p-2 min-w-[45px] h-16 ${color}`}
      onClick={() => {
        clickHandler(letter);
      }}
    >
      {letter}
    </button>
  );
}
