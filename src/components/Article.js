import { Component } from 'react'
import PropTypes from 'prop-types'
import { getArticle } from '../api'

export default class Article extends Component {
    static propTypes = {
        teamId: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    }
    
    state = {
        article: null
    }

    componentDidMount () {
        const { teamId, articleId } = this.props
        this.getArticle(teamId, articleId)
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.articleId !== nextProps.articleId) {
            this.getArticle(nextProps.teamId, nextProps.articleId)
        }
    }

    getArticle = (teamId, articleId) => {
        this.setState(() => ({
            article: null
        }))

        getArticle(teamId, articleId)
            .then((article) => this.setState(() => ({
                article
            })))
    }

    render () {
        return this.props.children(this.state.article)
    }
}



/**
 *           componentDidMount () {
                const { teamId, articleId } = this.props
                    this.getArticle(teamId, articleId)
                }
 
  When the component mounts, we want to invoke getArticle passing it the teamID as well as the articleId.
  But we also want to call getArticle when the component receives new props because component is not gonna remount again.
  but it's gonna be receiving new props specifically a new articleId or a new teamId perhaps.
  
  
*           componentWillReceiveProps (nextProps) {
                if (this.props.articleId !== nextProps.articleId) {
                    this.getArticle(nextProps.teamId, nextProps.articleId)
                }
            }

  When the component receives props, we will call those the nextProps & if this.props.articleId !== nextProps.articleId
  meaning we got a brand new articleId, we want to call getArticle again passing it the next teamID as well as the next articleId.

 * /
    
 
  
 */