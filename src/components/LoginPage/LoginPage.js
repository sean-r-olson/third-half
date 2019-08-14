import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import RegisterPage from '../RegisterPage/RegisterPage';
import LogInNav from '../LogInNav/LogInNav';

class LoginPage extends Component {
  
  render() {
    console.log(this.state)
    return (
      <>
      <LogInNav/>
      <RegisterPage/>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
// const mapStateToProps = state => ({
//   errors: state.errors,
// });

export default connect()(LoginPage);
