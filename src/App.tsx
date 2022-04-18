import "./App.css";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import LaunchGame from "./game/LaunchGame";
import Home from "./components/Home";
import About from "./components/About";
import { MoralisProvider } from "react-moralis";
import Mint from "./components/Mint";
import Game from "./game/Game";
import SectionLoader from "./components/SectionLoader";

function NotFound() {
  return <h1>not found!</h1>;
}

function App() {

  return (
    <Router>
      <MoralisProvider
        serverUrl={process.env.REACT_APP_MORALIS_SERVER_URL as string}
        appId={process.env.REACT_APP_MORALIS_APP_ID as string}
      >
        <div className="App">
          <div className="container">
          <Routes>
            <Route path="/" element={<SectionLoader />} />
            <Route path="/about" element={<SectionLoader />} />
            <Route path="/mint" element={<SectionLoader />} />
            <Route path="/launch-game" element={<SectionLoader />} />
            <Route path="/game" element={<Game />} /> {/*characterNum={characterChoices.characterNum} mechColor={characterChoices.mechColor} gunName={characterChoices.gunName}  */}

            <Route path="/NotFound" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/NotFound" />} />
          </Routes>
          </div>
        </div>
      </MoralisProvider>
    </Router>
  );
}

export default App;
