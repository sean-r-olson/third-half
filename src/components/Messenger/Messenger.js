import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';

class Messenger extends Component {

render() {
    return (
        <>
        <UpperNav /> 
        </>
    )
}
}

export default connect()(Messenger);
