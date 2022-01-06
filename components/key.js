import { BackspaceIcon } from "@heroicons/react/outline";

export default function Key({
  keyName,
  tried,
  present,
  correct,
  clickHandler,
}) {
  let color = "bg-gray-200";

  if (correct && correct.includes(keyName)) {
    color = "bg-correct";
  } else if (present && present.includes(keyName)) {
    color = "bg-present";
  } else if (tried && tried.includes(keyName)) {
    color = "bg-absent";
  }

  let el = keyName;
  if (keyName == "backspace") {
    el = <BackspaceIcon className="h-6 w-6" />;
  }

  return (
    <button
      className={`rounded uppercase font-bold p-2 min-w-[32px] md:min-w-[45px] h-16 ${color}`}
      onClick={() => {
        clickHandler ? clickHandler(keyName) : null;
      }}
    >
      {el}
    </button>
  );
}
