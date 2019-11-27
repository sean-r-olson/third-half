import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import styles
import '../App/App.css';

// material ui imports 
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        float: 'right',
        marginTop: '5px',
        marginRight: '5px',
        border: 'solid 3px #1d2c69', 
        borderRadius: '5px',
        height: '60px',
        paddingTop: '-5px'
    }, 
    input: {
        width: '50%',
        height: '50px',
        
        fontSize: '10px'
    }, 
    button: {
        float: 'right',
        marginTop: '-12%',
    }, 
    resize:{
      fontSize:10
    },
    textFieldBottom: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 100,
      marginTop: theme.spacing(-2),
      paddingTop: theme.spacing(1.5),
    },
    textFieldTop: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 100,
      marginTop: theme.spacing(-3),
      paddingTop: theme.spacing(1.5),
    },
})

class LogInForm extends Component {

state = {
    username: '',
    password: '',
  };

  login = () => {
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

  // HANDLE INPUT FIELD CHANGES
  // Set state to designated property's value
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const {classes} = this.props;
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
              <TextField className={classes.textFieldTop}
              onChange={this.handleInputChangeFor('username')}
              type="text"
              name="username"
              value={this.state.username}
              id="with-placeholder"
              placeholder="Username"
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              />
              <br/>
              <TextField 
              id="standard-password-input"
              placeholder="Password"
              className={classes.textFieldBottom}
              type="password"
              autoComplete="current-password"
              margin="normal"
              onChange={this.handleInputChangeFor('password')}
              InputProps={{
                classes: {
                  input: classes.resize,
                },
              }}
              />
              <Link to="/profile">
            <Button 
                variant="contained"
                color="primary"
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
      </div>
      )
  }
}

const mapStateToProps = state => ({
    errors: state.errors,
  });
  
  export default withStyles(styles)(connect(mapStateToProps)(LogInForm));