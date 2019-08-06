import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';

class TeamPlayers extends Component {

  state = {
    showPicture: true,
    id: 0,
    position: '',
  }

handleToggle = (item) => {
    this.props.dispatch({ type: 'FETCH_PLAYER', payload: item })
    if (this.state.showPicture === true) {
    console.log(this.state);
    this.setState({
      showPicture: false,
      id: this.props.reduxStore.singlePlayerReducer.id,
      position: this.props.reduxStore.singlePlayerReducer.position
    })} else {
    console.log(this.state);
    this.setState({
      showPicture: true,
      id: this.props.reduxStore.singlePlayerReducer.id,
      position: this.props.reduxStore.singlePlayerReducer.position
    })
    }
  }

render() {
    console.log(this.state);
    if (this.state.showPicture === true) {
    return (
    <div>
      <UpperNav /> 
      <DashboardNav/>
      {this.props.reduxStore.playersListReducer.map(item => {
        return(
          <div key={item.id}>
            <img class="playerImages" src={item.picture} alt="player_picture" onClick={(event) => this.handleToggle(item)}/>
          </div>
        )
      })}
    </div>
    )} else return (
      <div>
      <UpperNav /> 
      <DashboardNav />
      {this.props.reduxStore.playersListReducer.map(item => {
      return(
          <div key={item.id}>
            <div>
              <img class="playerImages" src={item.picture} alt="player_picture" onClick={(event) => this.handleToggle(item)} />
            </div>
          </div>
        )
      })}
      {JSON.stringify(this.props.reduxStore.singlePlayerReducer.position)}
      </div>
    )
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(TeamPlayers);
