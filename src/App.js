import React from "react";
import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/token-management" element={<Home />} />
          <Route exact path="/apply-for-ido" element={<Home />} />
          <Route exact path="/art" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
