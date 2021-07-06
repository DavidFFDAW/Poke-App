import React from 'react';
import PokeHeader from './components/PokeHeader';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/Home';
import './App.css';

function App() {
  return (
    <Router>
      <PokeHeader></PokeHeader>
      <Switch>
        <Route path="/">
          <HomePage/>
        </Route>
        <Route path="/pokemon/search/:pokemon"></Route>
        <Route path="/pokemon/:pokemon"></Route>
      </Switch>
    </Router>
  );
}

export default App;
