import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import '../App/App.css';
import Grid from '@material-ui/core/Grid';

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
            <img className="countryFlag" src={item.flag} alt="country_flag" />
          </div>
        )
      })}
      <br/>
      <Grid container spacing={24}>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={6}>
        <center>
        {this.props.reduxStore.teamsReducer.map(item => {
        return(
          <div className="teamInfo" key={item.id}>
            <img className="teamLogo" src={item.logo} alt="team_logo" />
            <br/>
            <p>{item.team_name}</p>
            <p>{item.city}, {item.state}</p>
          </div>
        )
      })}
      </center>
      </Grid>
      <Grid item xs={3}>
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

