import React from 'react'
import Sidebar from './Sidebar'
import { getTeamNames } from '../api'
import { teams } from '../dummy-data'

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

