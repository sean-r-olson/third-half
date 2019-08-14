import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';
import { compose } from 'redux';
import '../DashboardNav/DashboardNav.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import SvgIcon from '@material-ui/core/SvgIcon';


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

class DashboardNav extends Component {

  state = {
    highlightNone: true,
    profile: false,
    team: false,
    private: false,
    about: false,
  }

  toggleProfile = () => {
    this.setState({
    ...this.state,
      profile: true,
      highlightNone: false,
      team: false,
      private: false,
      about: false,
    })
  }

  toggleTeam = () => {
    this.setState({
      ...this.state,
      team: true,
      profile: false,
      highlightNone: false,
      private: false,
      about: false,
    })
  }

  togglePrivate = () => {
    this.setState({
      ...this.state,
      private: true,
      highlightNone: false,
      profile: false,
      team: false,
      about: false,
    })
  }

  toggleAbout = () => {
    this.setState({
      ...this.state,
      about: true,
      highlightNone: false,
      profile: false,
      team: false,
      private: false,
    })
  }

  render() {
    console.log(this.state)
    if (this.props.profile === true) {
    return (
 <div className="dashboardNav">
    <Grid container spacing={24}>
      {/* <div className="nav-right"> */}
        <Link onClick={(event) => this.toggleProfile()} to="/profile" className="highlightProfile">
          Profile 
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
          Team
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
          Private Posts
        </Link>
        <br/>
        {/* <Link to="/directMessage" className="dashboardNavLink">
          Direct Message
        </Link>
        <br/> */}
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
          About Us
        </Link>
        <br/>
        <Link to="/follow" className="dashboardNavLink">
          Follow Team
        </Link>
        {/* </div> */}
      </Grid>
     </div>
    )
  } else if (this.props.team === true) {
    return (
<div className="dashboardNav">
    <Grid container spacing={24}>
      {/* <div className="nav-right"> */}
        <Link onClick={(event) => this.toggleProfile()} to="/profile" className="dashboardNavLink">
          Profile
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="highlightTeam">
          Team
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
          Private Posts
        </Link>
        <br/>
        {/* <Link to="/directMessage" className="dashboardNavLink">
          Direct Message
        </Link>
        <br/> */}
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
          About Us
        </Link>
        <br/>
        <Link to="/follow" className="dashboardNavLink">
          Follow Team
        </Link>
        {/* </div> */}
      </Grid>
     </div>
    )} else if (this.props.private === true) {
      return (
<div className="dashboardNav">
    <Grid container spacing={24}>
      {/* <div className="nav-right"> */}
        <Link onClick={(event) => this.toggleProfile()} to="/profile" className="dashboardNavLink">
          Profile
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
          Team
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="highlightPrivate">
          Private Posts
        </Link>
        <br/>
        {/* <Link to="/directMessage" className="dashboardNavLink">
          Direct Message
        </Link>
        <br/> */}
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
          About Us
        </Link>
        <br/>
        <Link to="/follow" className="dashboardNavLink">
          Follow Team
        </Link>
        {/* </div> */}
      </Grid>
     </div>
      )} else if (this.props.about === true) {
        return (
      <div className="dashboardNav">
       <Grid container spacing={24}>
      {/* <div className="nav-right"> */}
        <Link onClick={(event) => this.toggleProfile()}  to="/profile" className="dashboardNavLink">
          Profile
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
          Team
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
          Private Posts
        </Link>
        <br/>
        {/* <Link to="/directMessage" className="dashboardNavLink">
          Direct Message
        </Link>
        <br/> */}
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="highlightAbout">
          About Us
        </Link>
        <br/>
        <Link to="/follow" className="dashboardNavLink">
          Follow Team
        </Link>
        {/* </div> */}
      </Grid>
     </div>
        )} else if (this.state.highlightNone === true) {
          return (
       <div className="dashboardNav">
          <Grid container spacing={24}>
            {/* <div className="nav-right"> */}
              <Link onClick={(event) => this.toggleProfile()}  to="/profile" className="dashboardNavLink">
                Profile
              </Link> 
              <br/>
              <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
                Team
              </Link>
              <br/>
              <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
                Private Posts
              </Link>
              <br/>
              {/* <Link to="/directMessage" className="dashboardNavLink">
                Direct Message
              </Link>
              <br/> */}
              <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
                About Us
              </Link>
              <br/>
              <Link to="/follow" className="dashboardNavLink">
                Follow Team
              </Link>
              {/* </div> */}
            </Grid>
           </div>
          )}
      }
    }

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