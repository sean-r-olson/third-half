import React, {Component} from 'react';
import { connect } from 'react-redux';

// import components 
import UpperNav from '../UpperNav/UpperNav';

// import styles
import '../App/App.css';

// material ui imports
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// declare styles to incorporate css properties into component
const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #1d2c69 30%, #ff66c4 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    fontSize: '10px',
    textAlign: 'center'
  },
  playerRoleMinneapolis: {
    color: '#00B7FF',
    textShadow: '2px 2px white',
    margin: '40px 25% 0px 25%',
    fontSize: '30px',
    textAlign: 'left',
    minWidth: '200px',
    maxWidth: '250px',
    padding: '0px',
    fontFamily: 'Bungee',
    margin: '5% 0% 0% 0%'
  },
  playerRoleMadison: {
    color: '#9B0E27',
    textShadow: '2px 2px #DAA520',
    margin: '40px 25% 0px 25%',
    fontSize: '30px',
    textAlign: 'left',
    minWidth: '200px',
    maxWidth: '250px',
    padding: '0px',
    fontFamily: 'Bungee',
    margin: '5% 0% 0% 0%',
    textAlign: 'center',
  },
  teamDescription: {
    color: '#DAA520',
    textShadow: '1px 1px #9B0E27', 
  },
  teamName: {
    color: '#9B0E27',
    textShadow: '2px 2px #DAA520',
    fontSize: '30px',
    textAlign: 'left',
    padding: '0px',
    fontFamily: 'Bungee',   
  },
  input: {
      margin: theme.spacing.unit
  },
  modal: {
      margin: theme.spacing.unit
  }, 
  dialog: {
    maxwidth: '100px'
  },
  playerRole: {
    color: '#ff66c4',
    textShadow: '2px 2px #1d2c69',
    margin: '5% 0% 0% 0%',
  }, 
  logo: {
    maxWidth: '50%',
    maxHeight: '50%',
    marginLeft: '10%',
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0px',
    float: 'right'
  }, 
  sentMessage: {
    backgroundColor: '#1d2c69',
    color: '#ff66c4',
    borderRadius: '3px',
    padding: '5px',
    margin: '5px',
    maxWidth: '400px'
  },
  recievedMessage: {
    backgroundColor: '#ff66c4',
    color: '#1d2c69',
    borderRadius: '3px',
    padding: '5px',
    margin: '5px',
    maxWidth: '400px'
  }, 
  messageButton: {
    textAlign: 'center',
    minWidth: '130px',
    maxWidth: '130px',
    textShadow: '1px 1px black',
    color: 'white',
    fontSize: '11px',
    paddingTop: '5px',
    paddingLeft: '0px',
    paddingRight: '0px',
  },
})

class ClickedTeam extends Component {

  state = {
    open_edit: false,
    open_messages: false,
    from_id: '',
    recieved_id: '',
    from_name: '',
    recieved_name: '',
    id: 0, 
    player_name: '',
    position: '',
    message: '',
    picture: '',
    team: true,
    new_message: true,
    team_name: this.props.reduxStore.playerProfileReducer.team_name,
  }

// HANDLE INPUT FIELD CHANGES
// Set state to designated property's value
handleChange = (event, propertyToChange) => {
  this.setState({
    ...this.state, 
    [propertyToChange]: event.target.value
  })
}

// Open edit player modal
// Set state to clicked item's property values
handleClickOpen = (item) => {
  this.setState({
    open_edit: true, 
    id: item.id,
    player_name: item.player_name,
    position: item.position,
    picture: item.picture
  })
}

// Close edit player modal
handleCloseEdit = () => {
  this.setState({
    open_edit: false
  })
}

// Close message modal
handleCloseMessages = () => {
  this.setState({
    open_messages: false,
  })
}

// Upon deleting player (button) --> send dispatch to players saga
handleDelete = () => {
  this.props.dispatch({type: 'DELETE_PLAYER', payload: this.state})
}

// Open message modal
// Dispatch fetch messages to message saga 
handleOpenMessages = (item) => {
  this.setState({
    open_messages: true,
    from_id: this.props.reduxStore.playerProfileReducer.id,
    recieved_id: item.id,
    from_name: this.props.reduxStore.playerProfileReducer.player_name,
    recieved_name: item.player_name,
    player_name: item.player_name,
    position: item.position,
    new_message: true,
  })
}

// Upon send, dispatch item's id to message saga - change message status
updateMessageStatus = (item) => {
  this.props.dispatch({type: 'UPDATE_MESSAGE_STATUS', payload: item.id})
}

// Upon hitting send, dispatch send message to message saga with message value
sendMessage = () => {
  this.props.dispatch({type: 'SEND_MESSAGE', payload: this.state})
  this.setState({
    ...this.state,
    message: ''
  })
}

render() {
    const {classes} = this.props;
    return(
    <>
    <UpperNav/>
    <Grid container spacing={24}>
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={10}>
        <h1 className={classes.playerRole}>Coaches</h1>
        {this.props.reduxStore.clickedTeamReducer.map(item => {
          if (item.team_id === 1 && item.role === 'coach') {
            return (
                <div key={item.id} className="playersDiv">
                  <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
                  <br/>
                  <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
                  <br/>
                </div>
          )} else if (item.team_id === 2 && item.role === 'coach') {
            return (
                <div key={item.id} className="playersDiv">
                  <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
                  <br/>
                  <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
                  <br/>
                </div>
            )}})}

        <h1 className={classes.playerRole}>Forwards</h1>
          {this.props.reduxStore.clickedTeamReducer.map(item => {
            if (item.team_id === 1 && item.role === 'forward') {
              return (
                  <div key={item.id} className="playersDiv">
                    <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
                    <br/>
                    <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
                    <br/>
                  </div>
            )} else if (item.team_id === 2 && item.role === 'forward') {
              return (
                  <div key={item.id} className="playersDiv">
                    <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
                    <br/>
                    <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
                    <br/>
                  </div>
              )}})}

        <h1 className={classes.playerRole}>Backs</h1>
          {this.props.reduxStore.clickedTeamReducer.map(item => {
            if (item.team_id === 1 && item.role === 'back') {
              return (
                  <div key={item.id} className="playersDiv">
                    <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
                    <br/>
                    <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
                    <br/>
                  </div>
            )} else if (item.team_id === 2 && item.role === 'back') {
              return (
                  <div key={item.id} className="playersDiv">
                    <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
                    <br/>
                    <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>

                    <br/>
                  </div>
        )}})}
      </Grid>
    </Grid>
      <Dialog className={classes.dialog}
        open={this.state.open_edit}
        onClose={this.handleCloseEdit}
      >
        <DialogContent className={classes.root}>
          <img className="playerCloseUp" src={this.state.picture} alt="PlayerPicture"/> 
          <Typography> {this.state.player_name}   |   {this.state.position}
          </Typography>
        </DialogContent>                      
      </Dialog> 
      <Dialog
        open={this.state.open_messages}
        onClose={this.handleCloseMessages}
      >
        <DialogTitle id="form-dialog-title">Messages</DialogTitle>
        <DialogContent>
          {this.props.reduxStore.messageReducer.map(item => {
            // if the user id (user that's logged in) matches the sender's id, 
            if (
              // CHECK IF:
              // the user either recieved or sent a message from or to the clicked player AND 
              // the user's id matches the recieved message id AND 
              // the recieved message is a new message
              (this.state.recieved_id === item.recieved_id || this.state.recieved_id === item.from_id) 
              && 
              (this.props.reduxStore.playerProfileReducer.id === item.recieved_id)
              && (item.new_message === true)) {
            return(
              <div key={item.id}>
                <DialogContent className={classes.recievedMessage}>
                <Typography>{item.from_name} | {item.to_char}</Typography>
                <Typography 
                multiline
                rowsMax="6">
                {item.message}
                <label class="container">
                <input onClick={(event) => {this.updateMessageStatus(item)}} type="checkbox"></input>
                <span class="checkmark"></span>
                </label>
                </Typography>
                </DialogContent>
              </div>
              
            )} else if (
              (this.state.recieved_id === item.recieved_id || this.state.recieved_id === item.from_id) 
              && 
              (this.props.reduxStore.playerProfileReducer.id === item.from_id)
              && (item.new_message === true)) {
              return(
                <div key={item.id}>
                <DialogContent className={classes.sentMessage}>
                <Typography 
                multiline
                rowsMax="6">
                {item.from_name} | {item.to_char}</Typography>
                <Typography >{item.message}</Typography>
                </DialogContent>
                </div>
              )
              } else if (
              (this.state.recieved_id === item.recieved_id || this.state.recieved_id === item.from_id) 
            && (this.props.reduxStore.playerProfileReducer.id === item.from_id)
            && (item.new_message === false)
            ) {
            //  (item.from_id === this.props.reduxStore.playerProfileReducer.id)
              //  && item.from_id === this.state.from_id
              return(
              <div key={item.id}>
                <DialogContent className={classes.sentMessage}>
                <Typography 
                multiline
                rowsMax="6">
                {item.from_name} | {item.to_char}</Typography>
                <Typography >{item.message}</Typography>
                </DialogContent>
              </div>
              )
            } else if (
              (this.state.recieved_id === item.recieved_id || this.state.recieved_id === item.from_id) 
            && (this.props.reduxStore.playerProfileReducer.id === item.recieved_id)
            && (item.new_message === false)
            ) {
            //  (item.from_id === this.props.reduxStore.playerProfileReducer.id)
              //  && item.from_id === this.state.from_id
              return(
              <div key={item.id}>
                <DialogContent className={classes.recievedMessage}>
                <Typography 
                multiline
                rowsMax="6">
                {item.from_name} | {item.to_char}</Typography>
                <Typography >{item.message}</Typography>
                </DialogContent>
              </div>
              )
        }})}
            <TextField multiline
            rowsMax="6" 
            onChange={event => this.handleChange(event, 'message')} label="Enter Text"
            className={classes.input}
            value={this.state.message}
            >
            </TextField>
            <DialogActions>
              <Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </>
    )}}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(ClickedTeam));
