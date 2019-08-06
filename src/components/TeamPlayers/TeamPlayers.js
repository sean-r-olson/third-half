import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';

class TeamPlayers extends Component {
    componentDidMount() {
      this.props.dispatch({type: 'FETCH_TEAM'})
    }

    render() {
    return(
    
    <div>
      <UpperNav /> 
      <DashboardNav/>
      {this.props.reduxStore.playersListReducer.map(item => {
        return(
          <div key={item.id}>
            <img class="playerImages" src={item.picture} alt="player_picture"/>
          </div>
        )
      })}
    </div>
    )
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(TeamPlayers);
