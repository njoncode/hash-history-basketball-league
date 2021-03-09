import React from 'react'
import { Route }  from 'react-router-dom'
import Sidebar from './Sidebar'
import { getTeamsArticles } from '../api'
import Article from './Article'

export default class Articles extends React.Component {
    state = {
        loading: true,
        teamArticles: []
    }

    componentDidMount () {
        getTeamsArticles(this.props.match.params.teamId)
            .then((teamArticles) => {
                this.setState(() => ({
                    loading: false,
                    teamArticles: teamArticles.map((article) => article.title)
                }))
            })
    }

    render () {
        const { loading, teamArticles } = this.state
        const { params, url } = this.props.match
        const { teamId } = params

        return (
            loading === true 
            ? <h1>LOADING</h1>
            : <div className='container two-column'>
                <Sidebar 
                    loading= {loading}
                    title='Articles'
                    list={teamArticles}
                    {...this.props}
                />

                <Route path={`${url}/:articleId`} render={({ match }) => (
                    <Article articleId={match.params.articleId} teamId={teamId}>
                        {(article) => !article ? <h1>LOADING</h1> : (
                            <div className='panel'>
                                <article className='article' key={article.id}>
                                    <h1 className='header'>{article.title}</h1>
                                    <p>{article.body}</p>
                                </article>
                            </div>
                        )}
                    </Article>
                )}
                />
            </div>
        )
    }
}




/**

 Now that we have the component which is gonna be rendered when the apps location matches '/teamId/articles/articleId' , 
 we wanna go ahead and build the route that will render it.
 
   In App.js:
             <Route path='/:teamId/articles' component={Articles}/>

 */