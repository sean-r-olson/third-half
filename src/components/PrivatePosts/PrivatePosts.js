import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    margin: '5% 0% 0% 0%',
    border: 'solid 3px #1d2c69', 
    borderRadius: '5px',
    color: '#1d2c69',
    textShadow: '1px 1px #ff66c4',
    backgroundColor: 'white',
    textAlign: 'center',
    maxHeight: 165
  },
  media: {
    height: 140,
  },
  teamName: {
    margin: '40% 1%',
    color: 'white',
    maxWidth: 100,
    textWeight: 900,
    fontSize: 30,

  },
  logo: {
    maxWidth: '30%',
    maxHeight: '30%',
    position: 'fixed'

  }, 
  logoContainer: {
    margin: '10% 0% 0% 5%',
  }, 
  messageBoardTitle: {
    border: 'solid 3px #1d2c69', 
    borderRadius: '5px 5px 0px 0px',
    color: '#ff66c4',
    textShadow: '2px 2px black',
    margin: '5% 0% 0% 0%',
    backgroundColor: '#1d2c69'
  }, 
  messageCards: {
    border: 'solid 2px #1d2c69', 
    borderRight: 'solid 1px #1d2c69',
    borderLeft: 'solid 7px #1d2c69',
    borderRadius: '0px'
  }, 
});

class PrivatePosts extends Component {

 state = {
    username: '',
    message: '',
    team_id: '',
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
    private: true,
  }

  // componentDidMount(){
  //   this.props.dispatch({type: 'FETCH_PRIVATE_POSTS', payload: this.state.team_id})
  // }

  handleSubmit = () => {
    console.log(this.state);
    this.props.dispatch({type: 'ADD_PRIVATE_POST', payload: this.state});
  }

  handleChangeFor = (event, propertyName) => {
    this.setState({
      ...this.state,
      username: this.props.reduxStore.user.username,
      team_id: this.props.reduxStore.user.team,
      [propertyName]: event.target.value
    })
  }

  render() {
    const {classes} = this.props;
    console.log(this.props.reduxStore);
    const { alignItems, direction, justify } = this.state;
    return (
      <>
      <UpperNav/>
        <Grid xs item={12}
            alignItems={alignItems}
            direction={direction}
            justify={justify}>
          <Grid
            container
            spacing={16}
            >
            <Grid item xs={2}>
              <DashboardNav private={this.state.private}/>
            </Grid>
          <Grid className={classes.logoContainer} item xs={3}>
            <img className={classes.logo} src={this.props.reduxStore.teamDataReducer.logo} />
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardContent>
              <h2>Add Message</h2>
                <TextField
                    className="privatePostsTextField" 
                    type="text" 
                    placeholder="message" 
                    onChange={(event) => this.handleChangeFor(event, 'message')}
                    value={this.state.message}
                    multiline
                    rowsMax="6"
                    >
                </TextField>
                <Button className="submitButton"
                onClick={this.handleSubmit}>Submit</Button>
                </CardContent>
            </Card>
            <Typography>
              <h2 className={classes.messageBoardTitle}>Message Board</h2>
            </Typography>
                  {this.props.reduxStore.privatePostsReducer.map(item => {
                  return(
                    <Card className={classes.messageCards}>
                      <CardContent key={item.id}>
                          <Typography className="privatePostsTitles">{item.username} | {item.to_char}</Typography> 
                          <hr className="horizontalRows"/>
                          <Typography className={classes.message}>{item.message}</Typography>
                      </CardContent>
                    </Card>
        )
      })}
              </Grid>
          </Grid>
      </Grid>
      </>
    );
  }
}


const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default withStyles(styles)(connect(mapStateToProps)(PrivatePosts));