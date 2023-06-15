import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import NumberFact from "./Components/NumberFact/NumberFact";
import SearchComponent from "./Components/SearchComponent/SearchComponent";

const App = () => {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/number-fact">Number Fact</Link>
            </li>
            <li>
              <Link to="/search">Search Component</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/number-fact" element={<NumberFact />} />
          <Route path="/search" element={<SearchComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
