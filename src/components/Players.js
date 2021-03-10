import React from 'react';
import { Route, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { getPlayers } from '../api';
import {parse} from 'query-string'
import slug from 'slug'
// import { players } from '../dummy-data';
import {
    TransitionGroup,
    CSSTransition
    } from 'react-transition-group'

export default function Players (props) {

    const [players, setPlayers] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const {location} = props  // location is just a router prop we are getting because React router is the thing that's creating or rendering this players element.

        location.search
        ? fetchPlayers(parse(location.search).teamId)   
        : fetchPlayers()
    })

    /**
     
     *      /players?teamId=bulls
     
        If there is a query parameter, the players we want to get are only all of the players on the bulls not all of the players in the whole app.
        But if we go to / players and query parameter isn't a thing, then we want to render the entire list of all of the players regardless of what team they are on.
        
     *  If location.search is a thing, meaning we wnat to grab all of the players on a specific team then we will call
        fetchPlayers passing it the teamName which we can get by calling parse passing it location.search.teamId.
        
        fetchPlayers(parse(location.search).teamId) 
    
      * And if there is no such thing as location.search, so we want to get all the players. Then we will just call fetchPlayers not passing it a teamId.
            fetchPlayers()

     */

    const fetchPlayers = (teamId) => {
        getPlayers(teamId)
        .then((players) => {
            return (
        setPlayers(players),
        setLoading(false)
            )
        })
    }   

    const { match, location } = props

    return (

        <div className='container two-column'>
            {/* {JSON.stringify(players, loading)} */}
            <Sidebar
                loading={loading}
                title='Players'
                list={players.map((player) => player.name )}
                {...props}
            />

        {loading === false && location.pathname === '/players'
        ? <div className='sidebar-instruction'>Select a player</div> 
        : null}

        <Route path={`${match.url}/:playerId`} render={({ match }) => {
            if(loading === true) return null

        const {name, position, teamId, number, avatar, apg, ppg, rpg, spg} = players.find((player) => slug(player.name) === match.params.playerId)

        return (
            <TransitionGroup className='panel'>
                <CSSTransition key={location.key} timeout={250} classNames='fade'>
                <div className='panel'>
                <img className='avatar' src={`${avatar}`} alt={`${name}'s avatar`} />
                <h1 className='medium-header'>{name}</h1>
                <h3 className='header'>#{number}</h3>
                <div className='row'>
                    <ul className='info-list' style={{marginRight: 80}}>
                        <li>Team
                            <div>
                                <Link style={{color:'#68809a'}} to={`/${teamId}`}>
                                    {teamId[0].toUpperCase() + teamId.slice(1)}
                                </Link>
                            </div>
                        </li>
                        <li>Position<div>{position}</div></li>
                        <li>PPG<div>{ppg}</div></li>
                    </ul>
                    <ul className='info-list'>
                        <li>APG<div>{apg}</div></li>
                        <li>SPG<div>{spg}</div></li>
                        <li>RPG<div>{rpg}</div></li>
                        </ul>
                </div>
            </div>
                </CSSTransition>
            </TransitionGroup>
        )
        }}
        />
        </div>
    )
}




/**
 *  ...props
    Any props that we pass to players which are gonna be all of the routing props (specifically match, location & history) 
    we want to pass those through to our sidebar component.


 * {loading === false && location.pathname === '/players'
        ? <div className='sidebar-instruction'>Select a player</div> 
        : null}

    If the user has already selected a player, location.pathname is gonna be something like '/players/Tyler-McGinnis'
    And if they haven't, then it's just gonna be '/players'
    So if the app isn't loading i.e when we are not fetching the current list and the user has not selected a player yet then, 'Select a player' will bee shown otherwise not.
 
 *  And because we have added support for query parameters, if we pass in a query parameter of teamId then we are gonna get only the players who are on a team with this id.

    http://localhost:3000/players?teamId=hedgehogs

*/


/**
          {teamId[0].toUpperCase() + teamId.slice(1)}
    We are capitalizing the team.
    That will take the first letter, capitalize it & then add on the rest of the letters.

 */


/**
 *          React TransitionGroup
 
 * We use React TransitionGroup to instead of just immediately showing one player over the other player, what if we slowly faded the new player in using animations.
   Inside of our route (what we want to be animating is the actual panel itself, the actually player coming in now)
   we will wrap this inside of a TransitionGroup.
   
* Three are three different things that we need to pass to CSS Transition:
  We need to pass it a key, so that TransitionGroup can effectivly know which items have left & which items have joined the brand new list or in this case it's children.
  We will use location.key. We already have access to location because we are already inside or this component is being rendered by React Router.
  So we have access to location  (const { match, location } = props)  from this.props.

  We will add a timeout which is basically how slow or fast we want the animation to go (we will say 250ms).
  
  And then we will add a className which is gonna be applied to both the entering childrean as well as the  children leaving based on their status whether they are leaving or entering.

* Then inside of our index.css file, we add the styles.

  What CSSTransition does is it takes the information it got from TransitionGroup, specifically if certain children are entering, leaving, or staying the same, and it applies a pair of class names to them during the ‘appear’, ‘enter’, and ‘exit’ stages of the transition based on their status. What this allows you to do is, based on those class names, have CSS in your app which will select the same class names that CSSTransition is applying and add some styles to those elements. For example, if we told CSSTransition to apply a fade class, our CSS might look like this

    .fade-enter {  opacity: 0;  z-index: 1;}
    
    fade-enter.fade-enter-active {  opacity: 1;  transition: opacity 250ms ease-in;}

    .fade-exit {
        display: none
    }

    display: none
    If an item is exiting, which it will when we click on a new user, & the old user is gonna be exiting, 
    then we just wanna go ahead and hide that because we don't wann show both the old user & the new user at the same time.
    Instead we want to fade the new user in from 0 to 1 for the opacity over 250ms & we wanna go ahead & just hide the old user.

    Note:  classNames='fade' not className

 */