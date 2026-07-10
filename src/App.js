import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./header";
import MlbPage from "./mlbpage";
import NflPage from "./nflpage"; 
import NbaPage from "./nbapage";
import WnbaPage from "./wnbapage";
import CfbPage from "./cfbpage";

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Routes>
          <Route path="/nfl" element={<NflPage />} />
          <Route path="/mlb" element={<MlbPage />} />
          <Route path="/nba" element={<NbaPage />} />
          <Route path="/wnba" element={<WnbaPage />} />
          <Route path="/cfb" element={<CfbPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;