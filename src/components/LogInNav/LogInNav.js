import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import '../UpperNav/UpperNav.css';
import '../App/App.css';
import LogInForm from '../LoginPage/LogInForm';

const UpperNav = (props) => (
  <div className="nav">
    <Link to="/profile">
      <img src="images/3rdHalf.png" alt="3rdHalf" className="nav-title"/>
    </Link>
    <LogInForm />
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

export default connect(mapStateToProps)(UpperNav);
