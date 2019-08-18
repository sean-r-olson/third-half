import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import { ThemeProvider } from '@material-ui/styles';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  registerTitle: {
    textAlign: 'initial',
    padding: '5%',
    marginBottom: '-2%',
    marginTop: '4%',
    color: '#ff66c4',
    textShadow: '1px 1px #1d2c69',
    backgroundColor: 'white',
    opacity: '0.75', 
    fontSize: 25,
    borderRadius: '3px'
  }, 
  register: {
    width: '350px',
    height: '350px',
    margin: '10% 0%',
    backgroundImage: 'url(images/3rdHalf.png)',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: 'solid 3px white'
    }, 
  registerInput: {
    backgroundColor: 'white',
    opacity: '0.75', 
    marginBottom: '10%', 
    marginRight: '15%', 
    marginLeft: '5%', 
    borderRadius: '3px',
    width: '285px',
    },
    registerButton: {
      marginTop: '3px',
      opacity: '1',
      width: '150px'
    },
    selectTeamButton: {
      marginTop: '10px',
      opacity: '1',
      width: '150px'
    }
});

class RegisterPage extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_ALL_TEAMS'})
  }

  state = {
    username: '',
    password: '',
    team_name: '',
    team: '',
    open: false,
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  };

  registerUser = (event) => {
    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          team_name: this.state.team_name,
          team: this.state.team
        },
      });
    } else {
      this.props.dispatch({type: 'REGISTRATION_INPUT_ERROR'});
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  handleToggle = () => {
      this.setState(state => ({ 
      open: !state.open,
    }))
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
  };

  handleTeamName = (item) => {
    this.setState({
      open: false,
      team_name: item.team_name
     });
     if (item.team_name === 'Minneapolis Mayhem') {
      this.setState({
      team: 1
       })
     } else if (item.team_name === 'Madison Minotaurs') {
       this.setState({
      team: 2
       })
     }
  }

  render() {
  console.log(this.props.state.teamsReducer);
  console.log(this.state)
  const { classes } = this.props;
  const { open } = this.state;
  const { alignItems, direction, justify } = this.state;
  if (this.state.team === '') {
      return (
        <Grid container spacing={16}>
        <Grid item xs={4}>
        </Grid>        
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}
          <Grid item xs={4}
            alignItems={alignItems}
            direction={direction}
            justify={justify}>
                <Grid item xs={12}>
                  <Grid item={4}>
                  </Grid>
                      <Grid item xs={8}>
                      <Card className={classes.register}>
                      <CardContent>
                        <center>
                        <h3 className={classes.registerTitle}>
                        New to 3rd Half?
                        <br/>
                        Register!
                        </h3>
                        </center>
                        </CardContent>
                        <CardContent className={classes.registerInput}>
                          <center>
                        <div>
                            <TextField
                              label={this.state.username}
                              type="text"
                              name="username"
                              placeholder="username"
                              value={this.state.username}
                              onChange={this.handleInputChangeFor('username')}
                            />
                        </div>
                        <div>
                            <TextField
                              label={this.state.password}
                              placeholder="password"
                              type="password"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleInputChangeFor('password')}
                            />
                        </div>    
                        <Button
                          className={classes.selectTeamButton}
                          variant="contained"
                          color="primary"
                          buttonRef={node => {
                            this.anchorEl = node;
                          }}
                          aria-owns={open ? 'menu-list-grow' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleToggle}
                        >
                          SELECT TEAM
                        </Button>
                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              id="menu-list-grow"
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                  <MenuList>
                                    {this.props.state.teamsReducer.map(item => {
                                return(
                                  <div key={item.id}>
                                    <MenuItem
                                    onClick={(event) => this.handleClose(event)}
                                    onClick={(event) => this.handleTeamName(item)}
                                    >
                                    {item.team_name}
                                    </MenuItem>                   
                                  </div>
                      )
                    })}   
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                        <div>
                          {this.state.team_name}
                        </div>
                        <div>
                        <Button 
                          variant="contained"
                          color="primary"
                          onClick={(event) => this.registerUser(event)}
                          className={classes.registerButton}
                          type="submit"
                          name="submit"
                          value="Register"
                        > Register 
                        </Button>
                        </div> 
                        </center>
                        </CardContent>                      
                      </Card>
                      </Grid>
              <Grid item xs={2}>
              </Grid>
          </Grid>
          {/* <center>
            <button
              type="button"
              className="link-button"
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              Login
            </button>
          </center> */}
        </Grid>
        <Grid xs item={4}>
        </Grid>
        </Grid>
      );
  } else if (this.state.team_name === 'Minneapolis Mayhem') {
    return (
        <Grid container spacing={16}>
        <Grid item xs={4}>
        </Grid>        
          {this.props.errors.registrationMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.registrationMessage}
            </h2>
          )}
          <Grid item xs={4}
            alignItems={alignItems}
            direction={direction}
            justify={justify}>
                <Grid item xs={12}>
                  <Grid item={4}>
                  </Grid>
                      <Grid item xs={8}>
                      <Card className={classes.register}>
                      <center>
                      <CardContent >
                        <center>
                        <h3 className={classes.registerTitle}>
                        New to 3rd Half?
                        <br/>
                        Register!
                        </h3>
                        </center>
                        <div>
                            <TextField
                              label={this.state.username}
                              type="text"
                              name="username"
                              placeholder="username"
                              value={this.state.username}
                              onChange={this.handleInputChangeFor('username')}
                            />
                        </div>
                        <div>
                            <TextField
                              label={this.state.password}
                              placeholder="password"
                              type="password"
                              name="password"
                              value={this.state.password}
                              onChange={this.handleInputChangeFor('password')}
                            />
                        </div>    
                        <Button 
                          buttonRef={node => {
                            this.anchorEl = node;
                          }}
                          aria-owns={open ? 'menu-list-grow' : undefined}
                          aria-haspopup="true"
                          onClick={this.handleToggle}
                        >
                          SELECT TEAM
                        </Button>
                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              id="menu-list-grow"
                              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                  <MenuList>
                                    {this.props.state.teamsReducer.map(item => {
                                return(
                                  <div key={item.id}>
                                    <MenuItem
                                    onClick={(event) => this.handleClose(event)}
                                    onClick={(event) => this.handleTeamName(item)}
                                    >
                                    {item.team_name}
                                    </MenuItem>                   
                                  </div>
                      )
                    })}   
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                        <div>
                          {this.state.team_name}
                        </div>
                        <div>
                        <Button onClick={(event) => this.registerUser(event)}
                          className={classes.registerButton}
                          type="submit"
                          name="submit"
                          value="Register"
                        > Register 
                        </Button>
                        </div>  
                      </CardContent>
                      </center>
                      </Card>
                      </Grid>
              <Grid item xs={2}>
              </Grid>
          </Grid>
          {/* <center>
            <button
              type="button"
              className="link-button"
              onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
            >
              Login
            </button>
          </center> */}
        </Grid>
        <Grid xs item={4}>
        </Grid>
        </Grid>
      );
  } else if (this.state.team_name === 'Madison Minotaurs') {
    return (
      <Grid container spacing={16}>
      <Grid item xs={4}>
      </Grid>        
        {this.props.errors.registrationMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.registrationMessage}
          </h2>
        )}
        <Grid item xs={4}
          alignItems={alignItems}
          direction={direction}
          justify={justify}>
              <Grid item xs={12}>
                <Grid item={4}>
                </Grid>
                    <Grid item xs={8}>
                    <Card className={classes.register}>
                    <center>
                    <CardContent >
                      <center>
                      <h3 className={classes.registerTitle}>
                      New to 3rd Half?
                      <br/>
                      Register!
                      </h3>
                      </center>
                      <div>
                          <TextField
                            label={this.state.username}
                            type="text"
                            name="username"
                            placeholder="username"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor('username')}
                          />
                      </div>
                      <div>
                          <TextField
                            label={this.state.password}
                            placeholder="password"
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChangeFor('password')}
                          />
                      </div>    
                      <Button 
                        buttonRef={node => {
                          this.anchorEl = node;
                        }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                      >
                        SELECT TEAM
                      </Button>
                      <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList>
                                  {this.props.state.teamsReducer.map(item => {
                              return(
                                <div key={item.id}>
                                  <MenuItem
                                  onClick={(event) => this.handleClose(event)}
                                  onClick={(event) => this.handleTeamName(item)}
                                  >
                                  {item.team_name}
                                  </MenuItem>                   
                                </div>
                    )
                  })}   
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                      <div>
                        {this.state.team_name}
                      </div>
                      <div>
                      <Button onClick={(event) => this.registerUser(event)}
                        className={classes.registerButton}
                        type="submit"
                        name="submit"
                        value="Register"
                      > Register 
                      </Button>
                      </div>  
                    </CardContent>
                    </center>
                    </Card>
                    </Grid>
            <Grid item xs={2}>
            </Grid>
        </Grid>
        {/* <center>
          <button
            type="button"
            className="link-button"
            onClick={() => {this.props.dispatch({type: 'SET_TO_LOGIN_MODE'})}}
          >
            Login
          </button>
        </center> */}
      </Grid>
      <Grid xs item={4}>
      </Grid>
      </Grid>
    );
  }
}
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
// const mapStateToProps = state => ({
//   errors: state.errors,
// });

const mapStateToProps = (state) => ({
  errors: state.errors,
  state
})

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

