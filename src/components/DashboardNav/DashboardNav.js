import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../DashboardNav/DashboardNav.css';

const DashboardNav = (props) => (
  <div className="dashboardNav">
    <Link to="/profile">
      Profile
    </Link>
    <br/>
    <Link to="/teamPlayers">
      Team
    </Link>
    <br/>
    <Link to="/privatePosts">
      Private Posts
    </Link>
    <br/>
    <Link to="/directMessage">
      Direct Message
    </Link>
    <br/>
    <Link to="/aboutUs">
      About Us
    </Link>
    <br/>
    <Link to="/follow">
      Follow Team
    </Link>
    </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(DashboardNav);
