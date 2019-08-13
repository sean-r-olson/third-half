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

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

class PrivatePosts extends Component {

 state = {
    username: '',
    message: '',
    team_id: '',
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
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
    // const {classes} = this.styles;
    console.log(this.props.reduxStore.privatePostsReducer);
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
              <DashboardNav/>
            </Grid>
          <Grid item xs={3}>
          </Grid>
          <Grid item xs={3}>
            <Card className="privateMessageInput">
              <CardContent>
              <h2>Add Message</h2>
                <TextField type="text" placeholder="message" 
                    onChange={(event) => this.handleChangeFor(event, 'message')}
                    value={this.state.message}>
                </TextField>
                <Button onClick={this.handleSubmit}>Submit</Button>
                </CardContent>
            </Card>
            <Typography>
              <h2>Message Board</h2>
            </Typography>
                  {this.props.reduxStore.privatePostsReducer.map(item => {
                  return(
                    <Card className="privatePostsMessages">
                      <CardContent key={item.id}>
                          <Typography className="privatePostsTitles">{item.username} | {item.to_char}</Typography> 
                          <hr className="horizontalRows"/>
                          <Typography>{item.message}</Typography>
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

export default connect(mapStateToProps)(PrivatePosts);