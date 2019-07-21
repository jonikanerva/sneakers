import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Sneakers from './Sneakers'
import Navigation from './Navigation'
import './App.css'

const App: React.FC = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route path="/adidas" render={() => <Sneakers brand="adidas" />} />
      <Route path="/jordan" render={() => <Sneakers brand="jordan" />} />
      <Route
        path="/newbalance"
        render={() => <Sneakers brand="newbalance" />}
      />
      <Route path="/nike" render={() => <Sneakers brand="nike" />} />
      <Route path="/" render={() => <Redirect to="/jordan" />} />
    </Switch>
  </Router>
)

export default App
