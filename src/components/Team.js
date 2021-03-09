import { Component } from 'react';
import PropTypes from 'prop-types';
import { getTeam } from '../api';

export default class Team extends Component {
    static propTypes = {
      id: PropTypes.string.isRequired,
      children: PropTypes.func.isRequired,
    }
    state = {
      team: null,
    }
    componentDidMount () {
      this.fetchTeam(this.props.id);    // this.props.id is gonna be the teamID.
    }

    // componentWillReceiveProps (nextProps) {
    //     if (this.props.id !== nextProps.id) {
    //       this.fetchTeam(nextProps.id)
    //     }
    //   }

    componentDidUpdate (prevProps) {
        if (prevProps.id !== this.props.id) {
            this.fetchTeam(this.props.id);
        }
    }
    
    fetchTeam = (id) => {
      this.setState(() => ({ team: null }));

      getTeam(id)
        .then((team) => this.setState(() => ({ team })))
    }
    render () {
      return this.props.children(this.state.team)
    }
  }


 /**
              render () {
                 return this.props.children(this.state.team)
                }
  
    When the render method runs here which it will, when we get the team (getTeam(id).then((team) => this.setState(() => ({ team })))}), 
    that is gonna invoke this.props.children, which will then gonna show this UI.
                    
            <div style={{width:'100%'}}>
            <TeamLogo id={team.id} className='center'/>)
    
  **/ 