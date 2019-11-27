import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

// import components 
import UpperNav from '../UpperNav/UpperNav';

// import styles 
import '../App/App.css';

// material ui imports
import Grid from '@material-ui/core/Grid';


class Teams extends Component {
    
  // on page load: 
  // send fetch all teams dispatch
  // send fetch countries dispatch
  componentDidMount () {
      this.props.dispatch({type: 'FETCH_ALL_TEAMS'});
      this.props.dispatch({type: 'FETCH_COUNTRIES'});
    }

  // click handler for logo click
  // target item's id --> send fetch clicked team dispatch with clicked logo's team id
  handleLogoClick = (item) => {
    this.props.dispatch({type: 'FETCH_CLICKED_TEAM', payload: item.id})
    }

render() {
    return (
      <>
      <UpperNav /> 
      <h1>Teams</h1>
      {this.props.reduxStore.countriesReducer.map(item => {
      return(
        <div key={item.id}>
          <img className="countryFlag" src={item.flag} alt="country_flag" />
        </div>
        )
      })}
      <br/>
      <Grid container spacing={24}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          <center>
          {this.props.reduxStore.teamsReducer.map(item => {
          return(
            <div className="teamInfo" key={item.id}>
              <Link to="/clickedTeam">
              <img onClick={(event) => this.handleLogoClick(item)} className="teamLogo" src={item.logo} alt="team_logo" />
              </Link>
              <br/>
              <p>{item.team_name}</p>
              <p>{item.city}, {item.state}</p>
            </div>
          )
          })}
          </center>
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>
    </>
    )
}
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
  })

export default connect(mapStateToProps)(Teams);

