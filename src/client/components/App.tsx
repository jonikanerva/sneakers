import React, { Fragment } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Navigation from './Navigation'
import Sneakers from './Sneakers'

import './App.css'

const App: React.FC = () => (
  <Fragment>
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
  </Fragment>
)

export default App
