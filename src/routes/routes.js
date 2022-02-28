import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

export default function Router() {
  return (
      <BrowserRouter>
        <Navigation /> 
        // I like to put my nav links into a seperate file
          <Switch>
            <Route exact path='/'>
              <PublicComponent />
            </Route>
          </Switch>
      </BrowserRouter>
  )
}