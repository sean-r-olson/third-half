import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';

class AboutUs extends Component {

    render() {
    return(
      <> 
      <UpperNav /> 
      <DashboardNav/>
      {this.props.reduxStore.teamsReducer.map(item => {
        return(
          <div className="teamInfo" key={item.id}>
            <p> {item.about_us} </p>
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

export default connect(mapStateToProps)(AboutUs);
