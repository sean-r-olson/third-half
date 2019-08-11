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

const styles = theme => ({
  input: {
      margin: theme.spacing.unit
  },
  modal: {
      margin: theme.spacing.unit
  }
})

class TeamPlayers extends Component {

  state = {
    open_edit: false,
    open_messages: false,
    from_id: '',
    recieved_id: '',
    id: 0, 
    player_name: '',
    position: '',
    message: '',
  }


  componentDidMount(){
    this.props.dispatch({type:'FETCH_TEAM'})
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
    position: item.position
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
  this.setState({
    open_messages: true,
    from_id: this.props.reduxStore.user.id,
    recieved_id: item.id,
    player_name: item.player_name,
    position: item.position
  })
}

sendMessage = () => {
  console.log('hit sendMessage Btn')
  this.props.dispatch({type: 'SEND_MESSAGE', payload: this.state})
}

render() {
    console.log(this.state);
    console.log(this.props.reduxStore.messageReducer)
    console.log(this.props.reduxStore.user)
    // const {classes} = this.props;
    if (this.props.reduxStore.user.admin_level === 1) {
    return (
    <>
      <UpperNav /> 
      <DashboardNav/>
      <br/>
      <br/>
      {this.props.reduxStore.playersListReducer.map(item => {
        return(
          <div className="playersDiv" key={item.id}>
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>

             <br/>
             <Button variant="outlined" color="primary" className="editButton" onClick={(event) => this.handleOpenMessages(item)}>Message</Button>
             {/* <Button variant="outlined" color="secondary">Delete Player</Button> */}
             <br/>
          </div>
        )
      })}
     <Dialog 
    //  className={classes.modal}
                open={this.state.open_edit}
                onClose={this.handleCloseEdit}
                >
                    <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
                    <DialogContent>
                              <TextField onChange={event => this.handleChange(event, 'player_name')} label={this.state.player_name}>
                              </TextField>
                              <TextField onChange={event => this.handleChange(event, 'position')} label={this.state.position}>
                              </TextField>
                              <DialogActions>
                              <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Delete Player</Button>
                              <Button variant="contained" color="primary" onClick={this.handleEdit}>Submit Edit</Button>
                              </DialogActions>
                    </DialogContent>
                    <br />
                    
                </Dialog> 
    <Dialog
              open={this.state.open_messages}
              onClose={this.handleCloseMessages}
              >
                <DialogTitle id="form-dialog-title">Messages</DialogTitle>
                <DialogContent>
                {this.props.reduxStore.messageReducer.map(item => {
                  if (item.from_id === this.props.reduxStore.user.id && item.recieved_id === this.state.recieved_id) 
                  return(
                    <div key={item.id}>
                      <Typography>Sent from User: {item.from_id}</Typography>
                      <Typography>{item.message}</Typography>
                    </div>
                  ); else if (item.recieved_id === this.props.reduxStore.user.id)
                  return(
                    <div key={item.id}>
                      <Typography>Recieved: {item.recieved_id}</Typography> 
                      <Typography>{item.message}</Typography>
                    </div>
                  );
                })}
                    <TextField onChange={event => this.handleChange(event, 'message')} label="Enter Text"></TextField>
                  <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
                    </DialogActions>
                </DialogContent>
                </Dialog>
    </>
    )} else
    //  if (this.props.reduxStore.messageReducer.recieved_id === this.state.recieved_id) {
      return (
        <>
        <UpperNav /> 
        <DashboardNav/>
        <br/>
        <br/>
        {this.props.reduxStore.playersListReducer.map(item => {
          return(
            <div className="playersDiv" key={item.id}>
              <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"/>
  
               <br/>
               <Button variant="outlined" color="primary" className="editButton" onClick={(event) => this.handleOpenMessages(item)}>Message</Button>
               {/* <Button variant="outlined" color="secondary">Delete Player</Button> */}
               <br/>
            </div>
          )
        })}
       <Dialog 
      //  className={classes.modal}
                  open={this.state.open_edit}
                  onClose={this.handleCloseEdit}
                  >
                      <DialogTitle id="form-dialog-title">Edit Player</DialogTitle>
                      <DialogContent>
                                <TextField onChange={event => this.handleChange(event, 'player_name')} label={this.state.player_name}>
                                </TextField>
                                <TextField onChange={event => this.handleChange(event, 'position')} label={this.state.position}>
                                </TextField>
                                <DialogActions>
                                <Button variant="outlined" color="secondary" onClick={this.handleDelete}>Delete Player</Button>
                                <Button variant="contained" color="primary" onClick={this.handleEdit}>Submit Edit</Button>
                                </DialogActions>
                      </DialogContent>
                      <br />
                      
                  </Dialog> 
      <Dialog
                open={this.state.open_messages}
                onClose={this.handleCloseMessages}
                >
                  <DialogTitle id="form-dialog-title">Messages</DialogTitle>
                  <DialogContent>
                  {this.props.reduxStore.messageReducer.map(item => {
                    if (item.from_id === this.props.reduxStore.user.id && item.recieved_id === this.state.recieved_id)
                    return(
                      <div key={item.id}>
                        <Typography>Sent from User: {item.from_id}</Typography>
                      <Typography>Recieved: {item.recieved_id}</Typography> 
                      <Typography>{item.message}</Typography>
                      </div>
                    )
                  })}
                      <TextField onChange={event => this.handleChange(event, 'message')} label="Enter Text"></TextField>
                    <DialogActions>
                      <Button variant="contained" color="primary" onClick={this.sendMessage}>Send</Button>
                      </DialogActions>
                  </DialogContent>
                  </Dialog>
      </>
    )
    // }
}
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(TeamPlayers);
