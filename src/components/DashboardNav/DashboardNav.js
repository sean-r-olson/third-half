import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../DashboardNav/DashboardNav.css';

const DashboardNav = (props) => (
  <div className="nav">
    <Link to="/profile">
      Profile
    </Link>
    <Link to="/teamPlayers">
      Team
    </Link>
    <Link to="/privatePosts">
      Private Posts
    </Link>
    <Link to="/directMessage">
      Direct Message
    </Link>
    <Link to="/aboutUs">
      About Us
    </Link>
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
