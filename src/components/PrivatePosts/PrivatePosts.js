import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';

class PrivatePosts extends Component {


    render() {
    return(
    
    <div>
      <UpperNav /> 
      <DashboardNav/>
    </div>
    )
}
}

export default connect()(PrivatePosts);
