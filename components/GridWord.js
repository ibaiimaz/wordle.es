import Letter from "./GridLetter";

export default function Word({ word, info }) {
  if (word === undefined) {
    word = "";
  }

  return (
    <div className="flex flex-row grid-flow-col gap-1">
      <Letter letter={word.charAt(0)} state={info ? info[0] : null} />
      <Letter letter={word.charAt(1)} state={info ? info[1] : null} />
      <Letter letter={word.charAt(2)} state={info ? info[2] : null} />
      <Letter letter={word.charAt(3)} state={info ? info[3] : null} />
      <Letter letter={word.charAt(4)} state={info ? info[4] : null} />
    </div>
  );
}
