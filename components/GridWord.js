import Letter from "./GridLetter";

export default function Word({ word, info, size }) {
  if (word === undefined) {
    word = "";
  }

  return (
    <div className="flex flex-row gap-1">
      <Letter
        size={size}
        letter={word.charAt(0)}
        state={info ? info[0] : null}
      />
      <Letter
        size={size}
        letter={word.charAt(1)}
        state={info ? info[1] : null}
      />
      <Letter
        size={size}
        letter={word.charAt(2)}
        state={info ? info[2] : null}
      />
      <Letter
        size={size}
        letter={word.charAt(3)}
        state={info ? info[3] : null}
      />
      <Letter
        size={size}
        letter={word.charAt(4)}
        state={info ? info[4] : null}
      />
    </div>
  );
}
