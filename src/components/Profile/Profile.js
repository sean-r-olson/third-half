import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';

class Profile extends Component {

    componentDidMount () {
        this.props.dispatch({type: 'FETCH_PLAYER_PROFILE', payload: this.props.reduxStore.user.id});
      }
    
render() {
    console.log(this.props.reduxStore.playerProfileReducer);
    return (
        <>
        <UpperNav /> 
        <div className="profileLayout">
        <DashboardNav/>
        <img className="profilePicture" src={this.props.reduxStore.playerProfileReducer.picture} />
        </div>
        </>
    )
}
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
  })

export default connect(mapStateToProps)(Profile);

