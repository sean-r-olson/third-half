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
    open: false,
    id: 0, 
    player_name: '',
    position: '',
   
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
    open: true, 
    id: item.id,
    player_name: item.player_name,
    position: item.position
  })
}

handleClose = () => {
  this.setState({
    open: false
  })
}

handleEdit = () => {
  this.setState({
    ...this.state,
      id: this.props.reduxStore.playersListReducer.id
    })
  this.props.dispatch({type: 'EDIT_PLAYER_INFO', payload: this.state})
  this.setState({ open: false })
}

handleDelete = () => {
  this.props.dispatch({type: 'DELETE_PLAYER', payload: this.state})
}

render() {
    console.log(this.state);
    console.log(this.props.reduxStore.playersListReducer)
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
            <img onClick={(event) => this.handleClickOpen(item)} className="playerImages" src={item.picture} alt="player_picture"
             />
             <br/>
             {/* <Button variant="outlined" color="primary" className="editButton" onClick={() => this.handleClickOpen()}>Edit Player</Button> */}
             {/* <Button variant="outlined" color="secondary">Delete Player</Button> */}
             <br/>
          </div>
        )
      })}
     <Dialog 
    //  className={classes.modal}
                open={this.state.open}
                onClose={this.handleClose}
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
    </>
    )} else return (
      <>
      <UpperNav /> 
      <DashboardNav />
      <br/>
      <br/>
      <Dialog>
          <DialogTitle> 
            <DialogContent>
              <TextField>
      {this.props.reduxStore.playersListReducer.map(item => {
      return(
          <div className="playersDiv" key={item.id}>
              <img className="playerImages" src={item.picture} alt="player_picture"
              //  onClick={(event) => this.handleToggle(item)}
                />
          </div>
        )
      })}
              </TextField>
            </DialogContent>
          </DialogTitle>
      </Dialog>
      </>
    )
    }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(TeamPlayers);
