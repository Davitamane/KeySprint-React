import logo from "../images/Logo.svg";
import logoDark from "../images/Logo-darkMode.svg";

export default function Header({ mode, setMode, gameOn }) {
  return (
    <header className="header">
      <img src={gameOn ? logoDark : logo} alt="logo" />
      <>
        <div className={`mode-container ${gameOn ? "hidden" : "visible"}`}>
          <Button onClick={() => setMode("normal")} active={mode === "normal"}>
            Normal mode
          </Button>
          <Button onClick={() => setMode("sprint")} active={mode === "sprint"}>
            Sprint mode
          </Button>
        </div>
        <Button
          className={gameOn ? "hidden" : "visible"}
          onClick={() =>
            window.open(
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ"
            )
          }
        >
          About us
        </Button>
      </>
    </header>
  );
}
function Button({ children, onClick, active = false, className }) {
  return (
    <button
      onClick={onClick}
      className={`btn ${className} ${active ? "btn-active" : ""}`}
    >
      {children}
    </button>
  );
}
