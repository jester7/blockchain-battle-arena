import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LaunchGame from "./game/LaunchGame";
import Home from "./components/Home";
import About from "./components/About";
import { MoralisProvider } from "react-moralis";
import Mint from "./components/Mint";

function UserProfile() {
  return <h1>User Profile! shows your NFTs here</h1>;
}

function NotFound() {
  return <h1>not found!</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <MoralisProvider
        serverUrl="https://u4usrl90abnw.usemoralis.com:2053/server"
        appId="pO4GGOpd6Qu3ampCQ5f4r2nS8WadcC8bv9q9V3PG"
      >
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-team" element={<About />} />
            <Route path="profiles/:address" element={<UserProfile />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="game" element={<LaunchGame />} />
            <Route path="/NotFound" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/NotFound" />} />
          </Routes>
        </div>
      </MoralisProvider>
    </BrowserRouter>
  );
}

export default App;
