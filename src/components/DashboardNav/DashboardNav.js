import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import '../DashboardNav/DashboardNav.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

// const {classes} = props;

const DashboardNav = (props) => (
  <div className="dashboardNav">
      <Grid xs={2}>
      {/* <div className="nav-right"> */}
        <Link to="/profile" className="dashboardNavLink">
          Profile
        </Link>
        <br/>
        <Link to="/teamPlayers" className="dashboardNavLink">
          Team
        </Link>
        <br/>
        <Link to="/privatePosts" className="dashboardNavLink">
          Private Posts
        </Link>
        <br/>
        <Link to="/directMessage" className="dashboardNavLink">
          Direct Message
        </Link>
        <br/>
        <Link to="/aboutUs" className="dashboardNavLink">
          About Us
        </Link>
        <br/>
        <Link to="/follow" className="dashboardNavLink">
          Follow Team
        </Link>
        {/* </div> */}
      </Grid>
    </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
// const mapStateToProps = state => ({
//   user: state.user,
// });

// export default connect(mapStateToProps)(DashboardNav);

export default compose(
  withStyles(styles), connect(),
)(DashboardNav);