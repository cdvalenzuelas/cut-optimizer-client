import React, { memo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import Projects from '@Pages/Projects'
import Home from '@Pages/Home'
import Login from '@Pages/LogIn'
import User from '@Pages/User'
import CutOptimizer from '@Pages/CutOptimizer'

function Routes () {
  return (
    <Router basename='/'>
      <Switch>
        <Route exact sensitive={false} path='/' component={Home} />
        <Route exact sensitive={false} path='/projects' component={Projects} />
        <Route sensitive={false} path='/cutOptimizer' component={CutOptimizer} />
        <Route exact sensitive={false} path='/loggin' component={Login} />
        <Route exact sensitive={false} path='/user' component={User} />
        <Route >
          <div>
              Error 404
          </div>
        </Route>
      </Switch>
    </Router>
  )
}

export default memo(Routes)
