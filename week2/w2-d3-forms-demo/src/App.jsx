import React from "react";
import FormHandlingExample from "./Components/FormHandlingExample/FormHandlingExample";
import Home from "./Components/Home/Home";
// import PokemonList from "./Components/PokemonList/PokemonList";
import PokemonDetails from "./Components/PokemonDetails/PokemonDetails";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./Components/PokemonList/PokemonList";

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
              <Link to="/pokemon">Pokémon</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
