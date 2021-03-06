import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect} from 'react-redux';

// import styles
import '../DashboardNav/DashboardNav.css';

// material ui imports
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  notifications: {
    float: 'left',
  }, 
  button: {
    margin: '0px 5px',
    color: 'white',
    textShadow: '1px 1px black'
  }, 
});

class DashboardNav extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_MESSAGES'})
  }

  state = {
    highlightNone: true,
    profile: false,
    team: false,
    private: false,
    about: false,
    open_notifications: false,
  }

  // set profile to true to highlight profile in navbar
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

  // set team to true to highlight team in navbar
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

  // set private to true to highlight private posts in navbar
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

  // set about to true to highlight about us in navbar
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

  // open notifications model
  handleOpenNotifications = () => {
    this.setState({
      open_notifications: true,
    })
  }

  // close notifications modal
  handleCloseNotifications = () => {
    this.setState({
      open_notifications: false,
    })
  }

  render() {
    const {classes} = this.props;
    if (this.props.profile === true) {
    return (
    <div className="dashboardNav">
      <Grid container spacing={24}>
          <Link onClick={(event) => this.toggleProfile()} to="/profile" className="highlightProfile">
            PROFILE 
          </Link> 
          <br/>
          <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
            TEAM
          </Link>
          <br/>
          <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
            PRIVATE POSTS
          </Link>
          <br/>
          <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
            ABOUT US
          </Link>
          <br/>
          <Button className={classes.button} variant="contained" color="primary" 
          onClick={(event) => this.handleOpenNotifications()}>Notifications</Button>
          <Grid xs item={1}>
            <Dialog
              className={classes.notifications}
              open={this.state.open_notifications}
              onClose={this.handleCloseNotifications}
              >
                {this.props.reduxStore.messageReducer.map(item => {
                      if (this.props.reduxStore.playerProfileReducer.id === item.recieved_id
                          && item.new_message === true){
                      return (
                      <DialogContent key={item.id}>
                        <DialogContentText> 
                        New Message from: {item.from_name} ({item.team_name})
                        </DialogContentText>
                      </DialogContent>
                      )}
                    })}
          </Dialog>
        </Grid>
      </Grid>
     </div>
    )
  } else if (this.props.team === true) {
    return (
<div className="dashboardNav">
    <Grid container spacing={24}>
        <Link onClick={(event) => this.toggleProfile()} to="/profile" className="dashboardNavLink">
          PROFILE
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="highlightTeam">
          TEAM
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
          PRIVATE POSTS
        </Link>
        <br/>
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
          ABOUT US
        </Link>
        <br/>
        <Button className={classes.button} variant="contained" color="primary" 
            onClick={(event) => this.handleOpenNotifications()}>Notifications</Button>
        <Grid xs item={1}>
              <Dialog
                className={classes.notifications}
                open={this.state.open_notifications}
                onClose={this.handleCloseNotifications}
                >
                  {this.props.reduxStore.messageReducer.map(item => {
                        if (this.props.reduxStore.playerProfileReducer.id === item.recieved_id
                            && item.new_message === true){
                        return (
                        <DialogContent key={item.id}>
                          <DialogContentText> 
                          New Message from: {item.from_name} ({item.team_name})
                          </DialogContentText>
                        </DialogContent>
                        )}
                      })}
            </Dialog>
            </Grid>
      </Grid>
     </div>
    )} else if (this.props.private === true) {
      return (
<div className="dashboardNav">
    <Grid container spacing={24}>
        <Link onClick={(event) => this.toggleProfile()} to="/profile" className="dashboardNavLink">
          PROFILE
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
          TEAM
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="highlightPrivate">
          PRIVATE POSTS
        </Link>
        <br/>
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
         ABOUT US
        </Link>
        <br/>
        <Button className={classes.button} variant="contained" color="primary" 
            onClick={(event) => this.handleOpenNotifications()}>Notifications</Button>
             <Grid xs item={1}>
              <Dialog
                className={classes.notifications}              
                open={this.state.open_notifications}
                onClose={this.handleCloseNotifications}
                >
                  {this.props.reduxStore.messageReducer.map(item => {
                        if (this.props.reduxStore.playerProfileReducer.id === item.recieved_id
                            && item.new_message === true){
                        return (
                        <DialogContent key={item.id}>
                          <DialogContentText> 
                          New Message from: {item.from_name} ({item.team_name})
                          </DialogContentText>
                        </DialogContent>
                        )}
                      })}
            </Dialog>
            </Grid>
      </Grid>
     </div>
      )} else if (this.props.about === true) {
        return (
      <div className="dashboardNav">
       <Grid container spacing={24}>
        <Link onClick={(event) => this.toggleProfile()}  to="/profile" className="dashboardNavLink">
          PROFILE
        </Link> 
        <br/>
        <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
          TEAM
        </Link>
        <br/>
        <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
          PRIVATE POSTS
        </Link>
        <br/>
        <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="highlightAbout">
          ABOUT US
        </Link>
        <br/>
        <Button className={classes.button} variant="contained" color="primary" 
            onClick={(event) => this.handleOpenNotifications()}>Notifications</Button>
            <Grid xs item={1}>
              <Dialog
                className={classes.notifications}
                open={this.state.open_notifications}
                onClose={this.handleCloseNotifications}
                >
                  {this.props.reduxStore.messageReducer.map(item => {
                        if (this.props.reduxStore.playerProfileReducer.id === item.recieved_id
                            && item.new_message === true){
                        return (
                        <DialogContent key={item.id}>
                          <DialogContentText> 
                          New Message from: {item.from_name} ({item.team_name})
                          </DialogContentText>
                        </DialogContent>
                        )}
                      })}
            </Dialog>
            </Grid>
      </Grid>
     </div>
        )} else if (this.state.highlightNone === true) {
          return (
       <div className="dashboardNav">
          <Grid container spacing={24}>
              <Link onClick={(event) => this.toggleProfile()}  to="/profile" className="dashboardNavLink">
                PROFILE
              </Link> 
              <br/>
              <Link onClick={(event) => this.toggleTeam()} to="/teamPlayers" className="dashboardNavLink">
                TEAM
              </Link>
              <br/>
              <Link onClick={(event) => this.togglePrivate()} to="/privatePosts" className="dashboardNavLink">
                PRIVATE POSTS
              </Link>
              <br/>
              <Link onClick={(event) => this.toggleAbout()} to="/aboutUs" className="dashboardNavLink">
                ABOUT US
              </Link>
              <br/>
              <Button className={classes.button} variant="contained" color="primary" 
            onClick={(event) => this.handleOpenNotifications()}>Notifications</Button>
             <Grid xs item={1}>
              <Dialog
                className={classes.notifications}
                open={this.state.open_notifications}
                onClose={this.handleCloseNotifications}
                >
                  {this.props.reduxStore.messageReducer.map(item => {
                        if (this.props.reduxStore.playerProfileReducer.id === item.recieved_id
                            && item.new_message === true){
                        return (
                        <DialogContent key={item.id}>
                          <DialogContentText> 
                          New Message from: {item.from_name} ({item.team_name})
                          </DialogContentText>
                        </DialogContent>
                        )}
                      })}
            </Dialog>
            </Grid>
            </Grid>
           </div>
          )}
      }
    }

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(DashboardNav));