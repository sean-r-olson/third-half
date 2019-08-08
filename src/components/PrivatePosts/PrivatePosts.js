import React, {Component} from 'react';
import { connect } from 'react-redux';
import UpperNav from '../UpperNav/UpperNav';
import DashboardNav from '../DashboardNav/DashboardNav';
import '../App/App.css';

class PrivatePosts extends Component {

 state = {
    user: '',
    message: '',
  }

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_PRIVATE_POSTS'})
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch({type: 'ADD_PRIVATE_POST', payload: this.state});
  }

  handleChangeFor = (event, propertyName) => {
    this.setState({
      ...this.state,
      [propertyName]: event.target.value
    })
  }

  render() {
    console.log(this.props.reduxStore.privatePostsReducer);
    return (
      <>
      <UpperNav/>
      <DashboardNav/>
      <section>
        <h2>Add Message</h2>
        <form onSubmit={this.handleSubmit}>
          <textarea type="text" placeholder="message" 
              onChange={(event) => this.handleChangeFor(event, 'message')}
              value={this.state.message} />
          <button>Submit</button>
        </form>
        {this.props.reduxStore.privatePostsReducer.map(item => {
      return(
          <div className="privatePosts" key={item.id}>
           <p>{item.message}</p> 
           <p>{item.date_time}</p>
          </div>
        )
      })}
      </section>

      </>
    );
  }
}

const mapStateToProps = (reduxStore) => ({
  reduxStore
})

export default connect(mapStateToProps)(PrivatePosts);
