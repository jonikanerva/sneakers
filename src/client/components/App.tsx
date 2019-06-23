import React from 'react'
import * as R from 'ramda'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'

import Sneakers from './Sneakers'
import Navigation from './Navigation'

import './App.css'

document.addEventListener(
  'DOMContentLoaded',
  () => {
    const images = window.document.getElementsByTagName('img')

    for (const image of images) {
      const height: number = R.propOr(0, 'naturalHeight', image)
      const width: number = R.propOr(0, 'naturalWidth', image)
      const parent: HTMLElement | undefined = R.path(
        ['parentElement', 'parentElement'],
        image
      )

      if ((width < 100 || height < 100) && parent) {
        parent.style.display = 'none'
      }
    }
  },
  { once: true }
)

const App: React.FC = () => (
  <Router>
    <Navigation />
    <Switch>
      <Route path="/nike" render={() => <Sneakers brand="nike" />} />
      <Route path="/jordan" render={() => <Sneakers brand="jordan" />} />
      <Route path="/adidas" render={() => <Sneakers brand="adidas" />} />
      <Route path="/" render={() => <Redirect to="/nike" />} />
    </Switch>
  </Router>
)

export default App
