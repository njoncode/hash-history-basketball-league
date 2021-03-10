import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar'
import Loading from './Loading'

import DynamicImport from './DynamicImport'

const Home = (props) => (
  <DynamicImport load={() => import('./Home')}>
    {(Component) => Component === null 
      ? <Loading/>
      : <Component {...props} />  
    }
  </DynamicImport>
)

const Players = (props) => (
  <DynamicImport load={() => import('./Players')}>
    {(Component) => Component === null 
      ? <Loading/>
      : <Component {...props} />  
    }
  </DynamicImport>
)

const Teams = (props) => (
  <DynamicImport load={() => import('./Teams')}>
    {(Component) => Component === null 
      ? <Loading/>
      : <Component {...props} />  
    }
  </DynamicImport>
)

const TeamPage = (props) => (
  <DynamicImport load={() => import('./TeamPage')}>
    {(Component) => Component === null 
      ? <Loading/>
      : <Component {...props} />  
    }
  </DynamicImport>
)

const Articles = (props) => (
  <DynamicImport load={() => import('./Articles')}>
    {(Component) => Component === null 
      ? <Loading/>
      : <Component {...props} />  
    }
  </DynamicImport>
) 

class App extends React.Component {
  render () {
  return (
    <Router>
      <div>
        <Navbar/>

        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/players' component={Players}/>
          <Route path='/teams' component={Teams}/>
          <Route path='/:teamId' exact component={TeamPage}/>
          <Route path='/:teamId/articles' component={Articles}/>
          <Route render={() => <h1 className='text-center'>404</h1>}/>
        </Switch>
      </div>
      </Router>
  );
}  
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



/**
  If we put <Route path='/:teamId' exact component={TeamPage}/> on the top, then if we go to /players and /team, it renders the TeamPage Component because all we are matching is /anything.
  So it thinks players is a teamId & also thinks team is a teamId.
  So we can fix this by moving this route to the bottom of our switch component. (ambiguous matches)
  So if players doesn't match and teams doesn't match but there is /something or the current location is '/anything',
  then this path is gonna match which we will then get the TeamPage component.
  And if neither of those or none of those matches, then we will get our 404 page.
 */



  /**
   *   DynamicImport
   * Instead of this being import stativally, we are gonna use DynamicImport
   
    
   */