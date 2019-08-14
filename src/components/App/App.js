import React, {Component} from 'react';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import UserPage from '../UserPage/UserPage';

// Import components 
import AboutUs from '../AboutUs/AboutUs';
import Teams from '../Teams/Teams';
import Messenger from '../Messenger/Messenger';
import Profile from '../Profile/Profile';
import TeamPlayers from '../TeamPlayers/TeamPlayers';
import PrivatePosts from '../PrivatePosts/PrivatePosts';
import DirectMessage from '../DirectMessage/DirectMessage';
import FollowButton from '../FollowButton/FollowButton';
import DashboardNav from '../DashboardNav/DashboardNav';
import UpperNav from '../UpperNav/UpperNav';


// Import style
import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
    this.props.dispatch({type: 'FETCH_GRAPHICS'})
  }

  render() {
    console.log(this.props.reduxStore.graphicsReducer)
    return (
      <Router>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/aboutUs"
              component={AboutUs}
            />
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
              />
             <Route
              exact
              path="/teams"
              component={Teams}
            />
             <Route
              exact
              path="/messenger"
              component={Messenger}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
              <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
            />
            <Route
              exact
              path="/teamPlayers"
              component={TeamPlayers}
            />
               <Route
              exact
              path="/privatePosts"
              component={PrivatePosts}
            />
               <Route
              exact
              path="/directMessage"
              component={DirectMessage}
            />
               <Route
              exact
              path="/follow"
              component={FollowButton}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
      </Router>
  )}
}


const mapStateToProps = (reduxStore) => ({
  reduxStore
})
export default connect(mapStateToProps)(App);
