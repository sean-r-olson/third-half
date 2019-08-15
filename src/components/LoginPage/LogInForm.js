import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import RegisterPage from '../RegisterPage/RegisterPage';
import LogInNav from '../LogInNav/LogInNav';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    card: {
        float: 'right',
        margin: theme.spacing.unit,
        border: 'solid 3px #1d2c69', 
        borderRadius: '5px',
        color: '#1d2c69',
        textShadow: '1px 1px #ff66c4',
        backgroundColor: 'white',
        height: '100px',
        maxWidth: '100%',
        fontSize: 10, 
        display: 'inline-block'
    }, 
    input: {
        width: '50%',
        height: '30%'
    }, 
    button: {
        float: 'right',
        margin: '-5% 0%'
    }
})

class LogInForm extends Component {


state = {
    username: '',
    password: '',
  };

  login = () => {
      console.log('hit login btn', this.state)
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
    console.log(this.state)
      return (
        <div>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage} 
          </h2>
        )}
        <Card className={classes.card}>
          <CardContent>
              <TextField className={classes.input}
                type="text"
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
              />
              <br/>
              <TextField className={classes.input}
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
              />
            <Button 
                onClick={(event) => this.login()}
                className={classes.button}
                type="submit"
                name="submit"
                value="Log In">   
                Log In    
            </Button>
          </CardContent>
        </Card>
        {/* <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
          >
            Register
          </button>
        </center> */}
      </div>


      )
  }
}

const mapStateToProps = state => ({
    errors: state.errors,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(LogInForm));