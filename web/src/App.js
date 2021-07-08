import React from 'react';
import PokeHeader from './components/PokeHeader/PokeHeader';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/Home';
import PokemonDetailPage from './pages/PokemonDetailPage';
import PokemonSearchPage from './pages/PokemonSearchPage';
import './App.css';

function App() {
  return (
    <Router>
      <PokeHeader></PokeHeader>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/pokemon/:name" exact>
          <PokemonDetailPage/>
        </Route>
        <Route path="/pokemon/search/:name" exact>
          <PokemonSearchPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
