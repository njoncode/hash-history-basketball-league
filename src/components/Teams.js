import React from 'react'
import Sidebar from './Sidebar'
import { getTeamNames } from '../api'
import { teams } from '../dummy-data'
import { Route, Link } from 'react-router-dom'
import TeamLogo from './TeamLogo'
import Team from './Team'

export default function Teams (props) {

    const [teamNames, setTeamNames] = React.useState([])
    const[loading, setLoading] = React.useState(true)

    React.useEffect (() => {
        getTeamNames()
        .then((teamNames) => 
            setTeamNames(teamNames),
            setLoading(false)
        )
    })

    const { location, match } = props
   
    return (
        <div className='container two-column'>
            <Sidebar
                loading={loading}
                title='Teams'
                list={teamNames}
                {...props}
            />

            {loading === false && location.pathname === '/teams' 
                ? <div className='sidebar-instruction'>Select a Team</div>
                : null}

            <Route path={`${match.url}/:teamId`} render= {({ match }) => (
                <div className='panel'>
                    <Team id={match.params.teamId}>
                        {(team) => team === null 
                        ?<h1>LOADING</h1>
                        : <div style={{width:'100%'}}>
                            <TeamLogo id={team.id} className='center'/>
                            <h1 className='medium-header'>{team.name}</h1>
                            <ul className='info-list row'>
                            <li>Established<div>{team.established}</div></li>
                            <li>Manager<div>{team.manager}</div></li>
                            <li>Coach<div>{team.coach}</div></li>
                            </ul>
                            <Link
                                className='center btn-main'
                                to={`${match.params.teamId}`}
                            >
                            {team.name} Team Page
                            </Link>
                        </div> 
                        }
                    </Team>
                </div>
            )}
            
            />
        </div>
    )
}


/**
 *          ...props   (all of our props, specifically our router props)
 
 * If we are at /teams, if the user hasn't already selected a team & we are not loading, we want to show 'Select a Team'
 
              {loading === false && location.pathname === '/teams' 
            ? <div className='sidebar-instruction'>Select a Team</div>
            : null}

 */

