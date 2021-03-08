import React, { Component } from 'react'
import { Route, Link } from 'react'
import Sidebar from './Sidebar'
import { getPlayers } from '../api';
import {parse} from 'query-string'
import slug from 'slug'

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
