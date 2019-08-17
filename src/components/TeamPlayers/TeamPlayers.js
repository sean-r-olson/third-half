import React, {Component} from 'react';
import { connect } from 'react-redux';
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
  root: {
    background: 'linear-gradient(45deg, #1d2c69 30%, #ff66c4 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    fontSize: '10px',
    textAlign: 'center'
  },
  input: {
      margin: '5px',
      maxWidth: '400px'
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
    fontFamily: 'Bungee'
  }, 
  teamName: {
    color: '#1d2c69',
    textShadow: '2px 2px #ff66c4',
    margin: '5% 0% 0% 0%',
    fontSize: '30px'
  }, 
  logo: {
    maxWidth: '50%',
    maxHeight: '50%',
    marginLeft: '10%',
    position: '-webkit-sticky',
    position: 'sticky',
    top: '0px',
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
  deleteButton: {
    float: 'left',
    marginLeft: '4%',
    
  },
  submitEditButton: {
    float: 'right',
    marginRight: '9%'
  }
  
})

class TeamPlayers extends Component {

  state = {
    open_edit: false,
    open_messages: false,
    from_id: '',
    recieved_id: '',
    from_name: '',
    recieved_name: '',
    id: '', 
    player_name: '',
    position: '',
    message: '',
    picture: '',
    team: true,
    new_message: true,
  }

  componentDidMount(){
      console.log('IN COMP DID MOUNT WITH:', this.props.reduxStore.user.team)
      this.props.dispatch({type:'FETCH_TEAM', payload: this.props.reduxStore.user.team})
    }
  
// handleToggle = (item) => {
//     if (this.state.showPicture === true) {
//     console.log(this.state);
//     console.log(this.props.reduxStore.user)
//     this.setState({
//       showPicture: false,
//       id: this.props.reduxStore.singlePlayerReducer.id,
//       position: this.props.reduxStore.singlePlayerReducer.position
//     })} else {
//     console.log(this.state);
//     this.setState({
//       showPicture: true,
//       id: this.props.reduxStore.singlePlayerReducer.id,
//       position: this.props.reduxStore.singlePlayerReducer.position
//     })
//     }
//   }

handleChange = (event, propertyToChange) => {
  this.setState({
    ...this.state, 
    [propertyToChange]: event.target.value
  })
}

handleClickOpen = (item) => {
  this.setState({
    open_edit: true, 
    id: item.id,
    player_name: item.player_name,
    position: item.position,
    picture: item.picture
  })
}

handleCloseEdit = () => {
  this.setState({
    open_edit: false
  })
}

handleCloseMessages = () => {
  this.setState({
    open_messages: false,
  })
}

updateMessageStatus = (item) => {
  console.log(item)
  this.props.dispatch({type: 'UPDATE_MESSAGE_STATUS', payload: item.id})
}

handleEdit = () => {
  this.setState({
    ...this.state,
      id: this.props.reduxStore.playersListReducer.id
    })
  this.props.dispatch({type: 'EDIT_PLAYER_INFO', payload: this.state})
  this.setState({ open_edit: false })
}

handleDelete = () => {
  this.props.dispatch({type: 'DELETE_PLAYER', payload: this.state})
}

handleOpenMessages = (item) => {
  this.props.dispatch({type: 'FETCH_MESSAGES'})
  this.setState({
    open_messages: true,
    from_id: this.props.reduxStore.playerProfileReducer.id,
    recieved_id: item.id,
    from_name: this.props.reduxStore.playerProfileReducer.player_name,
    recieved_name: item.player_name,
    player_name: item.player_name,
    position: item.position, 
    new_message: true
  })
  
  console.log(this.state)
}

sendMessage = () => {
  console.log('hit sendMessage Btn')
  this.props.dispatch({type: 'SEND_MESSAGE', payload: this.state})
}

render() {
    console.log(this.state);
    console.log(this.props.reduxStore.playerProfileReducer.id)
    // console.log(this.props.reduxStore.playerProfileReducer)
    // console.log(this.props.reduxStore.playersListReducer)
    // console.log(this.props.reduxStore.messageReducer)
    // console.log(this.props.reduxStore.user)
    // console.log(this.props.reduxStore.teamDataReducer)
    // console.log(this.props.reduxStore.clickedTeamReducer)
    // console.log(this.props.reduxStore.clickedTeamIdReducer)
    const {classes} = this.props;
    // IF USER'S ADMIN LEVEL IS 1, return the team page with access to editing player information 
    if (this.props.reduxStore.user.admin_level === 1) {
    return (
    <>
      <UpperNav /> 
      <Grid container spacing={24}>
        <Grid item xs={2}>
            <DashboardNav team={this.state.team}/>
        </Grid>
        <Grid item xs={10}>
      <br/>
      <img className="teamPlayersTeamLogo" src={this.props.reduxStore.teamDataReducer.logo} />
      <h1 className={classes.playerRole}>Coaches</h1>
      {this.props.reduxStore.playersListReducer.map(item => {
          if (item.role === 'coach') {
            return (
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
             <br/>
             <center>
             <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
             </center>
             {/* <Button variant="contained" color="secondary">Delete Player</Button> */}
             <br/>
          </div> 
          )}
      })}
      <br/>
      <h1 className={classes.playerRole}>Forwards</h1>
       {this.props.reduxStore.playersListReducer.map(item => {
          if (item.role === 'forward') {
            return (
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
             <br/>
             <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
             {/* <Button variant="contained" color="secondary">Delete Player</Button> */}
             <br/>
          </div> 
          )}
      })}
      <br/>
      <h1 className={classes.playerRole}>Backs</h1>
        {this.props.reduxStore.playersListReducer.map(item => {
          if (item.role === 'back') {
            return (
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
            <br/>
            <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
            {/* <Button variant="contained" color="secondary">Delete Player</Button> */}
            <br/>
          </div> 
          )}
        })}
     <Dialog 
    //  className={classes.modal}
                open={this.state.open_edit}
                onClose={this.handleCloseEdit}
                >
                    <DialogTitle id="formAialog-title">Edit Player</DialogTitle>
                    <DialogContent>
                              <TextField className={classes.input} onChange={event => this.handleChange(event, 'player_name')} label={this.state.player_name}>
                              </TextField>
                              <TextField className={classes.input} onChange={event => this.handleChange(event, 'position')} label={this.state.position}>
                              </TextField>
                    </DialogContent>
                    <DialogContent>
                              <DialogActions className={classes.deleteButton}>
                              <Button variant="contained" color="secondary" onClick={this.handleDelete}>Delete Player</Button>
                              </DialogActions>
                              <DialogActions className={classes.submitEditButton}>
                              <Button variant="contained" color="primary" onClick={this.handleEdit}>Submit Edit</Button>
                              </DialogActions>
                    </DialogContent>
                    <br />
                </Dialog>
                <center>
    <Dialog
              open={this.state.open_messages}
              onClose={this.handleCloseMessages}
              >
                 <DialogTitle id="form-dialog-title">
                   Messages
                   </DialogTitle>
   
                {this.props.reduxStore.messageReducer.map(item => {
                  console.log(item)
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
                    >
                    </TextField>
                  <DialogActions>
                    <Button variant="contained" color="primary" onClick={(event)=>{this.sendMessage()}}>Send</Button>
                    </DialogActions>
                </Dialog>
                </center>
                </Grid>
              </Grid>
    </>
    // IF USER'S ADMIN LEVEL IS NOT 1, RETURN THE SAME, BUT WITHOUT EDITING ACCESS
    )} else if (this.props.reduxStore.user.admin_level !== 1)
    return (
        <>
        <UpperNav /> 
        <Grid container spacing={24}>
        <Grid item xs={2}>
            <DashboardNav/>
        </Grid>
        <Grid item xs={10}>
      <br/>
      <br/>
      <img className="teamPlayersTeamLogo" src={this.props.reduxStore.teamDataReducer.logo} />
      <h1 className={classes.playerRole}>Coaches</h1>
      {this.props.reduxStore.playersListReducer.map(item => {
          if (item.role === 'coach') {
            return (
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
             <br/>
             <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
             {/* <Button variant="contained" color="secondary">Delete Player</Button> */}
             <br/>
          </div> 
          )}
      })}
      <br/>
      <h1 className={classes.playerRole}>Forwards</h1>
       {this.props.reduxStore.playersListReducer.map(item => {
          if (item.role === 'forward') {
            return (
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
             <br/>
             <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
             {/* <Button variant="contained" color="secondary">Delete Player</Button> */}
             <br/>
          </div> 
          )}
      })}
      <br/>
      <h1 className={classes.playerRole}>Backs</h1>
        {this.props.reduxStore.playersListReducer.map(item => {
          if (item.role === 'back') {
            return (
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
            <br/>
            <Button variant="contained" color="primary" className={classes.messageButton} onClick={(event) => this.handleOpenMessages(item)}>{item.player_name}</Button>
            {/* <Button variant="contained" color="secondary">Delete Player</Button> */}
            <br/>
          </div> 
          )}
        })}
       <Dialog className={classes.dialog}
      //  className={classes.modal}
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
                
                {this.props.reduxStore.messageReducer.map(item => {
                  console.log(item)
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
                      <Typography 
                      multiline
                      rowsMax="6">
                      {item.from_name} | {item.to_char}</Typography>
                      <Typography >{item.message}
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
                    >
                    </TextField>
                  <DialogActions>
                    <Button variant="contained" color="primary" onClick={(event)=>{this.sendMessage()}}>Send</Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                </Grid>
      </>
    )
    // }
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(TeamPlayers));
