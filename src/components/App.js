import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Players from './Players'
import Teams from './Teams'
import Navbar from './Navbar'

function App() {
  return (
    <Router>
      <div>
        <Navbar/>

        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/players' component={Players}/>
          <Route path='/teams' component={Teams}/>
          <Route render={() => <h1 className='text-center'>404</h1>}/>
        </Switch>
      </div>
      </Router>
  );
}

export default App;


/**  Setting up a catch-all (404) route.
 * 
 * We want to set up a catch-all (404) route. So if the user goes to a location that we don't have a route for, then we want to basically tell the user we don't have a route for this.
  
 * We are gonna use the switch component in order to do this. We will wrap all our routes inside of the switch component.
   Switch is gonna make sure that only one route ever matches, specifically the first route that matches.
   
   We can have a route without a path. But if we have a route without a path prop, that route is always gonna match. 
   But because we have stuck it in a switch, this route  (<Route render={() => <h1>404</h1>}/>)  will only ever match if neither of these three match before it. 
      <Route path='/' exact component={Home}/>
      <Route path='/players' component={Players}/>
      <Route path='/teams' component={Teams}/>
      If we are not at '/' , /players' or  /teams' , then that means this route  ( <Route render={() => <h1>404</h1>}/>)  is gonna match because it doesn't have a path prop.
      It's then gonna invoke the render method, which is gonna give us this UI which just says 404.
  */