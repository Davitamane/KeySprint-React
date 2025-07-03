import "./styles/App.css";
import Header from "./Components/Header";
import { useEffect, useState } from "react";
import reload from "./images/reload.svg";

const gameInfo = {
  normal:
    "In KeySprint, type the given text as fast and accurately as you can to beat your personal best time. Test your typing skills and aim for top speed and precision!",
  sprint:
    "In the Sprint mode, a storm slowly approaches as you type, creating intense pressure to surpass your high score. Type swiftly and accurately to stay in the clear and escape the storm!",
};
const testText =
  "She used to hate the rain, but today she danced in it, spinning under the gray clouds, soaked and smiling, because after everything she had been through, she realized the storm didn't mean she was drowning - it meant she had survived, and the water no longer held power over her.";
const testText12 =
  "Jumping monkeys joke politely. Milk keeps pouring nonstop. Opinion holds joy. Julia hums kindly. Look, neon lamps shine. Plump muffins make mouths open. Uphold noble hopes. Jolly kids pick pumpkins. Hello, moonlight! Kilometers jump hourly.";
function App() {
  const [mode, setMode] = useState("normal");
  const [typedText, setTypedText] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(testText12);
  const [gameOn, setGameOn] = useState(false);

  useEffect(() => {
    function handleKeyDown(e) {
      // const nextLetter = currentSentence[typedText.length];
      if (e.key !== currentSentence[0] && typedText.length === 0) return;

      if (e.key === "Backspace") {
        setTypedText((typedText) => typedText.slice(0, -1));
        // console.log(nextLetter);
        return;
      } else {
        if (e.key.length > 1) return;
        setTypedText((typedText) => [...typedText, e.key]);
        // console.log(nextLetter);
      }
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [typedText, currentSentence]);
  return (
    <>
      <Header setMode={setMode} mode={mode} gameOn={gameOn} />
      {mode === "normal" ? (
        <NormalMode
          currentSentence={currentSentence}
          typedText={typedText}
          setGameOn={setGameOn}
          gameOn={gameOn}
        />
      ) : (
        <SprintMode />
      )}
    </>
  );
}
function NormalMode({ currentSentence, typedText, gameOn, setGameOn }) {
  const [words, setWords] = useState(10);

  return (
    <div className="game-container">
      <Settings setWords={setWords} words={words} gameOn={gameOn} />
      <div className="text-container">
        <Info children={gameInfo.normal} gameOn={gameOn} />
        <Text
          text={currentSentence}
          typedText={typedText}
          setGameOn={setGameOn}
        />
      </div>
      <button className="btn-smaller reload">
        <img src={reload} alt="reload" />
        Regenerate
      </button>
    </div>
  );
}
function Settings({ setWords, words, gameOn }) {
  return (
    <div className="settings-container">
      <button className="btn-smaller" disabled={gameOn}>
        Punctuation
      </button>
      <button
        className={`btn-smaller ${words === 10 ? "btn-smaller-active" : ""}`}
        onClick={() => setWords(10)}
        disabled={gameOn}
      >
        10 words
      </button>
      <button
        className={`btn-smaller ${words === 25 ? "btn-smaller-active" : ""}`}
        onClick={() => setWords(25)}
        disabled={gameOn}
      >
        25 words
      </button>
      <button
        className={`btn-smaller ${words === 50 ? "btn-smaller-active" : ""}`}
        onClick={() => setWords(50)}
        disabled={gameOn}
      >
        50 words
      </button>
    </div>
  );
}
function Text({ text, typedText, setGameOn }) {
  let foundError = false;
  useEffect(() => {
    if (typedText.length === 1 && typedText[0] === text[0]) {
      setGameOn(true);
    }
  }, [typedText, text, setGameOn]);

  return (
    <p className="game-text">
      {text.split("").map((letter, i) => {
        let className = "";

        if (i < typedText.length) {
          if (foundError || typedText[i] !== letter) {
            className = "wrong";
            foundError = true;
          } else {
            className = "correct";
          }
        }

        return (
          <span key={i} className={`game-text ${className}`}>
            {letter}
          </span>
        );
      })}
    </p>
  );
}

function Info({ children, gameOn }) {
  return (
    <div className={`info ${gameOn ? "grayColor" : ""}`}>
      <h1>Basic info:</h1>
      <h4>{children}</h4>
    </div>
  );
}
function SprintMode() {
  return <div className="game-container">Settings</div>;
}
export default App;
