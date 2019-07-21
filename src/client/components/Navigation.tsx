import React from 'react'
import { NavLink } from 'react-router-dom'

import './Navigation.css'

const Navigation: React.FC = () => (
  <div className="navigation">
    <NavLink
      to="/jordan"
      className="navigation--link"
      activeClassName="navigation--active"
    >
      jordan
    </NavLink>
    <NavLink
      to="/nike"
      className="navigation--link"
      activeClassName="navigation--active"
    >
      nike
    </NavLink>
    <NavLink
      to="/newbalance"
      className="navigation--link"
      activeClassName="navigation--active"
    >
      nb
    </NavLink>
    <NavLink
      to="/adidas"
      className="navigation--link"
      activeClassName="navigation--active"
    >
      adidas
    </NavLink>
  </div>
)

export default Navigation
