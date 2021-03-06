import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import components 
import LogOutButton from '../LogOutButton/LogOutButton';

// import styles 
import './UpperNav.css';

const UpperNav = (props) => (
  <div className="nav">
    <Link to="/profile">
      <img src="images/3rdHalf.png" alt="3rdHalf" className="nav-title"/>
    </Link>
    <div className="nav-right">
      {/* <Link className="nav-link" to="/profile">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {/* {props.user.id ? 'Home' : 'Login / Register'} */} 
      {/* </Link> */}
      {/* Always show this link since the about page is not protected */}
      <Link to="/profile">
        <img className="teamLogoNav" src={props.state.teamDataReducer.logo} />
      </Link>
      <Link className="upperNavLink" to="/teams">
        TEAMS
      </Link>
      {/* Show the link to the logout button if the user is logged in */}
      {props.user.id && (
        <>
      <LogOutButton className="logOutButton"/>
        </>
      )}
    </div>
</div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  state
});

export default connect(mapStateToProps)(UpperNav);
