import "./index.css";
import Navbar from "./components/Navbar";
import Countries from "./components/Countries";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleCountry from "./components/SingleCountry";
import { useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="App h-full" data-theme={isDark ? "dark" : null}>
      <BrowserRouter>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <Routes>
          <Route path="/" element={<Countries isDark={isDark} />} />
          <Route path="/country/:name" element={<SingleCountry isDark={isDark} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
