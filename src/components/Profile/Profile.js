import React, {Component} from 'react';
import {connect} from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';
import Modal from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'; 
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    input: {
        margin: '0px'
    },  
    playerInfoMinneapolis: {
      color: '#00B7FF',
      textShadow: '2px 2px white',
      margin: '40px 25% 0px 25%',
      fontSize: '30px',
      textAlign: 'left',
      minWidth: '200px',
      maxWidth: '250px',
      padding: '0px',
      fontFamily: 'Bungee'
    },
    playerInfoMadison: {
      color: '#9B0E27',
      textShadow: '2px 2px #DAA520',
      margin: '40px 25% 0px 25%',
      fontSize: '30px',
      textAlign: 'left',
      minWidth: '200px',
      maxWidth: '250px',
      padding: '0px',
      fontFamily: 'Bungee'
    },
    playerImages: {
      minWidth: '120px',
      maxWidth: '120px',
      minHeight: '160px',
      maxHeight: '160px',
      border: 'solid  #1d2c69 3px',
    },
    profileImage: {
      border: 'solid #222 5px',
      margin: '10% 15%',
      minHeight: '300px',
      maxHeight: '350px',
      maxWidth: '300px',
      display: 'inline-block',
      boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
    },
    modal: {
        margin: theme.spacing.unit
    },
    editButton: {
        float: 'right',
        margin: '40px 10px', 
    },
    submitEditButton: {
        marginRight: '17px',
    }, 
    horizontalRow: {
      border: '1px solid white',
      borderRradius: '0px'    
    }
  })

class Profile extends Component {

componentDidMount () {
    this.props.dispatch({type: 'FETCH_PLAYER_PROFILE', payload: this.props.reduxStore.user.id});
}

state = {
    open_edit: false,
    profile: true,
  }

handleChange = (event, propertyToChange) => {
    this.setState({
        ...this.state, 
        [propertyToChange]: event.target.value
})
}

handleEditProfile = () => {
console.log('hit edit btn');
this.setState({
    open_edit: true,
    id: this.props.reduxStore.user.id,
    player_name: this.props.reduxStore.playerProfileReducer.player_name,
    position: this.props.reduxStore.playerProfileReducer.position,
    picture: this.props.reduxStore.playerProfileReducer.picture,
    })
}

handleEdit = () => {
    console.log('in handle edit with:', this.state)
    this.setState({
      ...this.state,
        id: this.props.reduxStore.user.id
      })
      this.props.dispatch({type: 'EDIT_PLAYER_PROFILE', payload: this.state})
    this.setState({
        ...this.state,
        player_name: this.props.reduxStore.playerProfileReducer.player_name,
        position: this.props.reduxStore.playerProfileReducer.position,
        open_edit: false
    })
  }
  
handleDelete = () => {
    this.props.dispatch({type: 'DELETE_PLAYER', payload: this.state})
}
  
handleCloseEdit = () => {
    this.setState({
      open_edit: false
    })
  }
    
render() {
    const {classes} = this.props;
    if (this.props.reduxStore.user.team === 1){
    return (
        <>
        <UpperNav /> 
        <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
        {/* <div className="profileLayout"> */}
            <DashboardNav profile={this.state.profile}/>
          </Grid>
        <Grid item xs={3}>
          <Typography className={classes.playerInfoMinneapolis}>
            {this.props.reduxStore.playerProfileReducer.player_name}
            <hr className={classes.horizontalRow}/>
          </Typography>
          <Typography className={classes.playerInfoMinneapolis}>
            {this.props.reduxStore.playerProfileReducer.team_name}
            <hr className={classes.horizontalRow}/>
          </Typography>
          <Typography className={classes.playerInfoMinneapolis}>
            {this.props.reduxStore.playerProfileReducer.position}
            <hr className={classes.horizontalRow}/>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img 
          className={classes.profileImage}
          src={this.props.reduxStore.playerProfileReducer.picture} />
        </Grid>
         <Grid item xs={2}>
         <Button variant="contained" color="primary" className={classes.editButton} onClick={(event) => this.handleEditProfile()}>Edit Profile</Button>
          </Grid>
        <Dialog 
                open={this.state.open_edit}
                onClose={this.handleCloseEdit}
                >
                    <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
                    <DialogContent>
                          <center>
                              <TextField 
                              className={classes.input}
                              onChange={event => this.handleChange(event, 'player_name')} 
                              label={this.props.reduxStore.playerProfileReducer.player_name}>
                              </TextField>
                              <br/>
                              <TextField
                              className={classes.input}
                              onChange={event => this.handleChange(event, 'position')} 
                              label={this.props.reduxStore.playerProfileReducer.position}>
                              </TextField>
                              <br/>
                              <br/>
                              <img className={classes.playerImages} src={this.props.reduxStore.playerProfileReducer.picture} alt="playerProfilePic"/>
                              <DialogActions>
                              <center>
                              <Button className={classes.submitEditButton} variant="contained" color="primary" onClick={this.handleEdit}>Submit Edit</Button>
                              </center>
                              </DialogActions>
                              <DialogActions>
                              <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Delete Profile</Button>
                              </DialogActions>
                          </center>
                    </DialogContent>
                    <br />
                </Dialog> 
                </Grid>
              </Grid>
        </>
    )} else if (this.props.reduxStore.user.team === 2){
      return(
        <>
        <UpperNav /> 
        <Grid item xs={12}>
        <Grid container spacing={24}>
          <Grid item xs={2}>
        {/* <div className="profileLayout"> */}
            <DashboardNav profile={this.state.profile}/>
          </Grid>
        <Grid item xs={3}>
          <Typography className={classes.playerInfoMadison}>
            {this.props.reduxStore.playerProfileReducer.player_name}
            <hr className={classes.horizontalRow}/>
          </Typography>
          <Typography className={classes.playerInfoMadison}>
            {this.props.reduxStore.playerProfileReducer.team_name}
            <hr className={classes.horizontalRow}/>
          </Typography>
          <Typography className={classes.playerInfoMadison}>
            {this.props.reduxStore.playerProfileReducer.position}
            <hr className={classes.horizontalRow}/>
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <img 
          className={classes.profileImage}
          src={this.props.reduxStore.playerProfileReducer.picture} />
        </Grid>
         <Grid item xs={2}>
         <Button variant="contained" color="primary" className={classes.editButton} onClick={(event) => this.handleEditProfile()}>Edit Profile</Button>
          </Grid>
        <Dialog 
                open={this.state.open_edit}
                onClose={this.handleCloseEdit}
                >
                    <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
                    <DialogContent>
                          <center>
                              <TextField 
                              className={classes.input}
                              onChange={event => this.handleChange(event, 'player_name')} 
                              label={this.props.reduxStore.playerProfileReducer.player_name}>
                              </TextField>
                              <br/>
                              <TextField
                              className={classes.input}
                              onChange={event => this.handleChange(event, 'position')} 
                              label={this.props.reduxStore.playerProfileReducer.position}>
                              </TextField>
                              <br/>
                              <br/>
                              <img className={classes.playerImages} src={this.props.reduxStore.playerProfileReducer.picture} alt="playerProfilePic"/>
                              <DialogActions>
                              <center>
                              <Button className={classes.submitEditButton} variant="contained" color="primary" onClick={this.handleEdit}>Submit Edit</Button>
                              </center>
                              </DialogActions>
                              <DialogActions>
                              <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Delete Profile</Button>
                              </DialogActions>
                          </center>
                    </DialogContent>
                    <br />
                </Dialog> 
                </Grid>
              </Grid>
        </>

      )
    }
}
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
  })

export default withStyles(styles)(connect(mapStateToProps)(Profile));

