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
// const testText2 =
// "Jumping monkeys joke politely. Milk keeps pouring nonstop. Opinion holds joy. Julia hums kindly. Look, neon lamps shine. Plump muffins make mouths open. Uphold noble hopes. Jolly kids pick pumpkins. Hello, moonlight! Kilometers jump hourly.";
const testText2 = "test test";
function App() {
  const [mode, setMode] = useState("normal");
  const [typedText, setTypedText] = useState([]);
  const [currentSentence, setCurrentSentence] = useState(testText2);
  const [gameOn, setGameOn] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);

  function handleRegenerate() {
    setTypedText([]);
    setCurrentSentence(testText);
    setFinished(false);
    setTime(0);
  }
  useEffect(() => {
    if (!gameOn) return;

    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOn]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== currentSentence[0] && typedText.length === 0) return;

      if (e.key === "Backspace") {
        setTypedText((typedText) => typedText.slice(0, -1));
        return;
      } else {
        if (e.key.length > 1) return;

        setTypedText((typedText) => [...typedText, e.key]);
        if (typedText.length + 1 === currentSentence.length) {
          console.log("HALOO");
          setFinished(true);
          setGameOn(false);
        }
        console.log(typedText.length);
        console.log(currentSentence.length);
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
          handleRegenerate={handleRegenerate}
          time={time}
          finished={finished}
        />
      ) : (
        <SprintMode />
      )}
    </>
  );
}
function NormalMode({
  currentSentence,
  typedText,
  gameOn,
  setGameOn,
  handleRegenerate,
  time,
  finished,
}) {
  const [words, setWords] = useState(10);

  if (!gameOn && finished) {
    return (
      <div className="game-container">
        <h1>WOO LESGOO</h1>
        <div className="game-info">
          Time: <span className="yello">{time}s</span>
        </div>
        <div className="game-info">
          Letters: <span className="yello">43/50</span>
        </div>
        <button className="btn-smaller reload" onClick={handleRegenerate}>
          <img src={reload} alt="reload" />
          Regenerate
        </button>
      </div>
    );
  }
  return (
    <div className="game-container">
      <Settings
        setWords={setWords}
        words={words}
        gameOn={gameOn}
        time={time}
        typedText={typedText}
        currentSentence={currentSentence}
      />
      <div className="text-container">
        <Info children={gameInfo.normal} gameOn={gameOn} />
        <Text
          text={currentSentence}
          typedText={typedText}
          setGameOn={setGameOn}
        />
      </div>
      <button className="btn-smaller reload" onClick={handleRegenerate}>
        <img src={reload} alt="reload" />
        Regenerate
      </button>
    </div>
  );
}
function Settings({
  setWords,
  words,
  gameOn,
  time,
  typedText,
  currentSentence,
}) {
  return (
    <div className="settings-container">
      {gameOn ? (
        <>
          <div className="game-info">
            Time: <span className="yello">{time}s</span>
          </div>
          <div className="game-info">
            Letters:{" "}
            <span className="yello">
              {typedText.length}/{currentSentence.length}
            </span>
          </div>
        </>
      ) : (
        <>
          <button className="btn-smaller" disabled={gameOn}>
            Punctuation
          </button>
          <button
            className={`btn-smaller ${
              words === 10 ? "btn-smaller-active" : ""
            }`}
            onClick={() => setWords(10)}
            disabled={gameOn}
          >
            10 words
          </button>
          <button
            className={`btn-smaller ${
              words === 25 ? "btn-smaller-active" : ""
            }`}
            onClick={() => setWords(25)}
            disabled={gameOn}
          >
            25 words
          </button>
          <button
            className={`btn-smaller ${
              words === 50 ? "btn-smaller-active" : ""
            }`}
            onClick={() => setWords(50)}
            disabled={gameOn}
          >
            50 words
          </button>
        </>
      )}
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
  return (
    <div className="game-container">Work in progress...(i aint doing shit)</div>
  );
}
export default App;
