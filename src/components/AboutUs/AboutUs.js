import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';
import Grid from '@material-ui/core/Grid';


class AboutUs extends Component {

    // componentDidMount(){
    //   console.log(this.props.reduxStore.user.id)
    //   // this.props.dispatch({type: 'FETCH_TEAM_DATA', payload: this.props.reduxStore.user.id})
    // }

    state = {
      about: true 
    }

    render() {
      console.log(this.props.reduxStore.teamDataReducer)
    return(
      <> 
      <UpperNav /> 
      <Grid container spacing={24}>
      <Grid item xs={2}>
      <DashboardNav about={this.state.about}/>
      </Grid>
      <Grid item xs={2}>
      <img className="aboutUsTeamLogo" src={this.props.reduxStore.teamDataReducer.logo} alt="team-logo"/>
      </Grid>
      <Grid item xs={5}>
      <img className="teamPicture" src={this.props.reduxStore.teamDataReducer.team_picture} alt="team-picture"/>
      <h1 className="aboutUsTitle">{this.props.reduxStore.teamDataReducer.team_name}</h1>
      <h2 className="aboutUsTeamInfo">{this.props.reduxStore.teamDataReducer.city} | {this.props.reduxStore.teamDataReducer.state}</h2>
      <p className="aboutUs">{this.props.reduxStore.teamDataReducer.about_us}</p>
      </Grid>
      <Grid item xs={1}>
      </Grid>
      </Grid>
    </>
    )
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(AboutUs);
