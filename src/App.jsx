import "./styles/App.css";
import Header from "./Components/Header";
import { useState } from "react";

const gameInfo = {
  normal:
    "In KeySprint, type the given text as fast and accurately as you can to beat your personal best time. Test your typing skills and aim for top speed and precision!",
  sprint:
    "In the Sprint mode, a storm slowly approaches as you type, creating intense pressure to surpass your high score. Type swiftly and accurately to stay in the clear and escape the storm!",
};

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
  return (
    <div className="game-container">
      <Settings />
      <Info children={gameInfo.normal} />
    </div>
  );
}
function Settings() {
  return (
    <div className="settings-container">
      <button className="btn-smaller">Punctuation</button>
      <button className="btn-smaller">Numbers</button>
      <button className="btn-smaller">10 words</button>
      <button className="btn-smaller">25 words</button>
      <button className="btn-smaller">50 words</button>
    </div>
  );
}
function Info({ children }) {
  return <h4>{children}</h4>;
}
function SprintMode() {
  return <div className="game-container">Settings</div>;
}
export default App;
