import "./styles/App.css";
import logo from "./images/Logo.svg";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("normal");
  return (
    <>
      <Header setMode={setMode} mode={mode} />
      {mode === "normal" ? <p>NORMAL</p> : <p>SPRINT</p>}
    </>
  );
}
function Header({ mode, setMode }) {
  return (
    <header className="header">
      <img src={logo} alt="logo" />

      <div className="mode-container">
        <Button onClick={() => setMode("normal")} active={mode === "normal"}>
          Normal mode
        </Button>
        <Button onClick={() => setMode("sprint")} active={mode === "sprint"}>
          Sprint mode
        </Button>
      </div>
      <Button
        onClick={() =>
          window.open(
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ"
          )
        }
      >
        About us
      </Button>
    </header>
  );
}
function Button({ children, onClick, active = false }) {
  return (
    <button onClick={onClick} className={`btn ${active ? "btn-active" : ""}`}>
      {children}
    </button>
  );
}
export default App;
