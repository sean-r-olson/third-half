import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';

class AboutUs extends Component {

    render() {
    return(
    
    <div>
      <UpperNav /> 
      <DashboardNav/>
      {this.props.reduxStore.teamsReducer.map(item => {
        return(
          <div className="teamInfo" key={item.id}>
            <p> {item.about_us} </p>
          </div>
        )
      })}
    </div>
    )
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(AboutUs);
