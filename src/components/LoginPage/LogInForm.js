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
import { Link } from 'react-router-dom';


const styles = theme => ({
    card: {
        float: 'right',
        marginTop: '5px',
        marginRight: '5px',
        border: 'solid 3px #1d2c69', 
        borderRadius: '5px',
        color: '#1d2c69',
        textShadow: '1px 1px #ff66c4',
        backgroundColor: 'white',
        height: '60px',
        maxWidth: '100%',
        fontSize: 10, 
        display: 'inline-block',
        paddingLeft: '20px'
    }, 
    input: {
        width: '50%',
        height: '50px',
        margin: '-7%',
        fontSize: '10px'
    }, 
    button: {
        float: 'right',
        margin: '-13% 0%'
    }, 
    resize:{
      fontSize:12
    },
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
              {/* <TextField className={classes.input} */}
              <TextField className={classes.input}
              onChange={this.handleInputChangeFor('username')}
              type="text"
              name="username"
              value={this.state.username}
              id="with-placeholder"
              placeholder="username"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              // className={classes.textField}
              // margin="normal"
              />
              <br/>
              <TextField className={classes.input}
              onChange={this.handleInputChangeFor('password')}
              type="text"
              name="password"
              value={this.state.password}
              id="with-placeholder"
              placeholder="password"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              // className={classes.textField}
              // margin="normal"
              />
              <Link to="/profile">
            <Button 
                onClick={(event) => this.login()}
                className={classes.button}
                type="submit"
                name="submit"
                value="Log In">   
                Log In    
            </Button>
            </Link>
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