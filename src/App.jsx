import "./App.css";
import logo from "./images/Logo.svg";

function App() {
  return (
    <>
      <Header />
    </>
  );
}
function Header() {
  return (
    <header className="header">
      <Logo />
      <div>
        <Button>Hello</Button>
        <Button>test</Button>
      </div>
      <div>
        <Button>About us</Button>
      </div>
    </header>
  );
}
function Button({ children }) {
  return <button className="btn">{children}</button>;
}
function Logo() {
  return <img src={logo} alt="logo" />;
}

export default App;
