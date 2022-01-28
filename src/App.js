import React from 'react';
import PokeHeader from './components/PokeHeader/PokeHeader';
import PokeFooter from './components/PokeFooter/PokeFooter';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import HomePage from './pages/Home';
import PokemonDetailPage from './pages/PokemonDetailPage';
import PokemonSearchPage from './pages/PokemonSearchPage';
import PokeMoveInfoPage from './pages/PokeMoveInfoPage';
import './App.css';
import { PokeContextProvider } from './Context/PokeContext';

function App() {

  if (!document.body.classList.contains('dark')) {
    document.body.classList.add('dark');
  }

  return (
    <PokeContextProvider>
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
          <Route path="/pokemon/move/info/:move" exact>
            <PokeMoveInfoPage/>
          </Route>
        </Switch>
        <PokeFooter></PokeFooter>
      </Router>
    </PokeContextProvider>
  );
}

export default App;
