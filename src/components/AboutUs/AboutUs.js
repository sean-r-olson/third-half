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
    return(
      <> 
      <UpperNav /> 
      <Grid item xs={2}>
      <DashboardNav about={this.state.about}/>
      </Grid>
      <p>{this.props.reduxStore.teamDataReducer.about_us}</p>
    </>
    )
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(AboutUs);
