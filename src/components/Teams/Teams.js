import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import '../App/App.css';
class Teams extends Component {

    componentDidMount () {
        this.props.dispatch({type: 'FETCH_ALL_TEAMS'});
        this.props.dispatch({type: 'FETCH_COUNTRIES'});
      }

render() {
    return (
        <>
        <UpperNav /> 
        <h1>Teams</h1>
        {this.props.reduxStore.countriesReducer.map(item => {
        return(
          <div key={item.id}>
            <img class="countryFlag" src={item.flag} alt="country_flag" />
          </div>
        )
      })}
      <br/>
        {this.props.reduxStore.teamsReducer.map(item => {
        return(
          <div key={item.id}>
            <img class="teamLogo" src={item.logo} alt="team_logo" />
          </div>
        )
      })}
        </>
    )
}
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
  })

export default connect(mapStateToProps)(Teams);

