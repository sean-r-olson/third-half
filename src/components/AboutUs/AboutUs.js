import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';

class AboutUs extends Component {

    // componentDidMount(){
    //   console.log(this.props.reduxStore.user.id)
    //   // this.props.dispatch({type: 'FETCH_TEAM_DATA', payload: this.props.reduxStore.user.id})
    // }

    render() {
    return(
      <> 
      <UpperNav /> 
      <DashboardNav/>
      <p>{this.props.reduxStore.teamDataReducer.about_us}</p>
    </>
    )
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(AboutUs);
