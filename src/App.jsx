import "./styles/App.css";
import Header from "./Components/Header";
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

export default App;
