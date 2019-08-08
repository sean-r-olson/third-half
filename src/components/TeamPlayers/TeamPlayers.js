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
    <>
      <UpperNav /> 
      <DashboardNav/>
      {this.props.reduxStore.playersListReducer.map(item => {
        return(
          <div className="playersDiv" key={item.id}>
            <img className="playerImages" src={item.picture} alt="player_picture" onClick={(event) => this.handleToggle(item)}/>
          </div>
        )
      })}
    </>
    )} else return (
      <>
      <UpperNav /> 
      <DashboardNav />
      {this.props.reduxStore.playersListReducer.map(item => {
      return(
          <div className="playersDiv" key={item.id}>
              <img  src={item.picture} alt="player_picture" onClick={(event) => this.handleToggle(item)} />
          </div>
        )
      })}
      {JSON.stringify(this.props.reduxStore.singlePlayerReducer.position)}
      </>
    )
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(TeamPlayers);
