import React from 'react'
import TeamLogo from './TeamLogo'
import {Link} from 'react-router-dom'
import {getTeamNames} from '../api'

export default function Home () {

    const [teamNames, setTeamNames] = React.useState([])
    

    React.useEffect(() =>
      getTeamNames()
        .then((teamNames) => setTeamNames(teamNames)
    )
    )

    return (
        <div className='container'>
            <h1 className='large-header'>Hash History Basketball League</h1>
            <h3 className='header text-center'> Select a team</h3>
            <div className='home-grid'>
                {teamNames.map((id) => (
                <Link key={id} to={`/${id}`}>
                    <TeamLogo id={id} width='125px'/>
                    </Link>
                ))}
            </div>
        </div>
    )
}


/**
 * This Home component is gonna have some state to it. The state we are gonna add is just a TeamNames Array.
 * We are gonna fetch our teams using getTeamNames. We will add those to the state that will cause a re-render & then we look at the list of our teamNames.

 * When the component mounts, is when we want to call getTeamNames.
 * componentDidMount - When component mounts, we want to invoke getTeamNames which is gonna return us a promise that will resolve with the actual teamNames.
 * So we will call setSate and we will pass it the teamNames. So then TeamName property will have all of the teams inside of it.
 * 
 */