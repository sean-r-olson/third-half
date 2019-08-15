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
import { objectExpression } from '@babel/types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    input: {
        margin: theme.spacing.unit
    },
    modal: {
        margin: theme.spacing.unit
    },
    editBtn: {
        margin: 'auto'
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
    console.log(this.props.reduxStore.playerProfileReducer);
    console.log(this.state)
    const {classes} = this.props;
    return (
        <>
        <UpperNav /> 
        <Grid container spacing={24}>
          <Grid item xs={2}>
        {/* <div className="profileLayout"> */}
            <DashboardNav profile={this.state.profile}/>
          </Grid>
        <Grid item xs={3}>
        </Grid>
        <Grid item xs={3}>
          <img 
          className="profilePicture"
          src={this.props.reduxStore.playerProfileReducer.picture} />
         </Grid>
         <Grid item xs={4}>
         <Button variant="outlined" color="primary" className="editButton" onClick={(event) => this.handleEditProfile()}>Edit Profile</Button>
          </Grid>
        <Dialog 
                open={this.state.open_edit}
                onClose={this.handleCloseEdit}
                >
                    <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
                    <DialogContent>
                          <center>
                              <TextField onChange={event => this.handleChange(event, 'player_name')} label={this.props.reduxStore.playerProfileReducer.player_name}>
                              </TextField>
                              <br/>
                              <TextField onChange={event => this.handleChange(event, 'position')} label={this.props.reduxStore.playerProfileReducer.position}>
                              </TextField>
                              <br/>
                              <br/>
                              <img className="playerImages" src={this.props.reduxStore.playerProfileReducer.picture} alt="playerProfilePic"/>
                              <DialogActions>
                              <Button className={classes.editBtn} variant="contained" color="primary" onClick={this.handleEdit}>Submit Edit</Button>
                              </DialogActions>
                              <DialogActions>
                              <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Delete Profile</Button>
                              </DialogActions>
                          </center>
                    </DialogContent>
                    <br />
                </Dialog> 
                
              </Grid>
        </>
        
    )
}
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
  })

export default withStyles(styles)(connect(mapStateToProps)(Profile));

