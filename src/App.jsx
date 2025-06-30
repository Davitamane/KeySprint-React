import "./styles/App.css";
import Header from "./Components/Header";
import { useState } from "react";
import reload from "./images/reload.svg";

const gameInfo = {
  normal:
    "In KeySprint, type the given text as fast and accurately as you can to beat your personal best time. Test your typing skills and aim for top speed and precision!",
  sprint:
    "In the Sprint mode, a storm slowly approaches as you type, creating intense pressure to surpass your high score. Type swiftly and accurately to stay in the clear and escape the storm!",
};
const testText =
  "She used to hate the rain, but today she danced in it, spinning under the gray clouds, soaked and smiling, because after everything she had been through, she realized the storm didn’t mean she was drowning—it meant she had survived, and the water no longer held power over her.";

function App() {
  const [mode, setMode] = useState("normal");
  return (
    <>
      <Header setMode={setMode} mode={mode} />
      {mode === "normal" ? <NormalMode /> : <SprintMode />}
    </>
  );
}
function NormalMode() {
  const [words, setWords] = useState(10);

  return (
    <div className="game-container">
      <Settings setWords={setWords} words={words} />
      <div className="text-container">
        <Info children={gameInfo.normal} />
        <Text children={testText} />
      </div>
      <button className="btn-smaller reload">
        <img src={reload} alt="reload" />
        Regenerate
      </button>
    </div>
  );
}
function Settings({ setWords, words }) {
  return (
    <div className="settings-container">
      <button className="btn-smaller">Punctuation</button>
      <button
        className={`btn-smaller ${words === 10 ? "btn-smaller-active" : ""}`}
        onClick={() => setWords(10)}
      >
        10 words
      </button>
      <button
        className={`btn-smaller ${words === 25 ? "btn-smaller-active" : ""}`}
        onClick={() => setWords(25)}
      >
        25 words
      </button>
      <button
        className={`btn-smaller ${words === 50 ? "btn-smaller-active" : ""}`}
        onClick={() => setWords(50)}
      >
        50 words
      </button>
    </div>
  );
}
function Text({ children }) {
  return <p className="game-text">{children}</p>;
}
function Info({ children }) {
  return (
    <div className="info">
      <h1>Basic info:</h1>
      <h4>{children}</h4>
    </div>
  );
}
function SprintMode() {
  return <div className="game-container">Settings</div>;
}
export default App;
