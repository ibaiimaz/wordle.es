import Key from "./KeyboardKey";

export default function Keyboard({ clickHandler }) {
  const row1letters = "qwertyuiop";
  const row2letters = "asdfghjklñ";
  const row3letters = "zxcvbnm";

  const row1 = row1letters.split("").map((letter, index) => {
    return <Key key={index} keyName={letter} clickHandler={clickHandler} />;
  });

  const row2 = row2letters.split("").map((letter, index) => {
    return <Key key={index} keyName={letter} clickHandler={clickHandler} />;
  });

  const row3 = row3letters.split("").map((letter, index) => {
    return <Key key={index} keyName={letter} clickHandler={clickHandler} />;
  });
  row3.splice(
    0,
    0,
    <Key key="return" keyName="enter" clickHandler={clickHandler} />
  );
  row3.push(
    <Key key="backspace" keyName="backspace" clickHandler={clickHandler} />
  );

  return (
    <div className="flex flex-col container w-full max-w-lg my-5 px-2 mx-auto gap-2">
      <div className="flex gap-1">{row1}</div>
      <div className="flex gap-1">{row2}</div>
      <div className="flex gap-1">{row3}</div>
    </div>
  );
}
