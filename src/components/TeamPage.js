import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { getTeamsArticles, getTeamNames } from '../api'
import TeamLogo from './TeamLogo'
import Team from  './Team'
import slug from 'slug'
import { teams } from '../dummy-data'

export default class TeamPage extends React.Component {

    state = {
        loading: true,
        articles: [],
        teamNames: {}
    }

        componentDidMount () {
            Promise.all([
                getTeamNames(),
                getTeamsArticles(this.props.match.params.teamId)
            ]).then(([teamNames,articles]) => {
                this.setState(() => ({
                    loading: false,
                    articles,
                    teamNames,
                }))
            })
    }

    render () {

        const { loading, articles, teamNames} = this.state;
        const { match } = this.props;
        const { teamId } = match.params;

        if (
            loading === false &&
            teamNames.includes(teamId) === false
        ) {
            return <Redirect to='/' />
        }

        return(
            <div>
                <Team id={teamId}>
                    {(team) => team === null
                        ? 'LOADING'
                        : <div className='panel'>
                            <TeamLogo id={teamId} />
                            <h1 className='medium-header'>{team.name}</h1>
                            <h4 style={{margin: 5}}>
                                <Link 
                                    style={{cursor: 'pointer'}}
                                    to={{
                                        pathname: '/players',
                                        search: `?teamId=${teamId}`
                                    }}>
                                    View Roster
                                </Link>
                            </h4>
                            <ul className='championships'>
                                {team.championships.map((ship) => <li key={ship}>{ship}</li> )}
                            </ul>
                            <ul className='info-list row' style={{width: '100%'}}>
                                <li>Established<div>{team.established}</div></li>
                                <li>Manager<div>{team.manager}</div></li>
                                <li>Coach<div>{team.coach}</div></li>
                            </ul>
                            <h2 className='header'>
                                Articles
                            </h2>
                            <ul className='articles'>
                                {articles.map((article)=> (
                                <li key={article.id}>
                                    <Link
                                        to={`${match.url}/articles/${slug(article.title)}`}
                                    >
                                    <h4 className='article-title'>
                                        {article.title}
                                    </h4>
                                    <div className='article-date'>{article.date.toLocaleDateString()}</div>
                                    </Link>
                                </li>)
                                )}
                            </ul>
                        </div>}
                </Team>
            </div>
        )
    }
  }



  /** 
                if (
                    loading === false &&
                    teamNames.includes(teamId) === false
                ) {
                    return <Redirect to='/' />
                }

    If loading === false (meaning if we are no longer loading) & teamNames.includes(teamId) === false, 
    then we want to redirect the user taking them to the home route.
    Now if the user tries to go to a route that is not actually a team,instead of getting that broken UI, we want to redirect them to the homepage.
   
*/