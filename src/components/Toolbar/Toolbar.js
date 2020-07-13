import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import "./Toolbar.css";


class Toolbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: this.props.isLoggedIn,
      user: this.props.user
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      this.setLoggedIn();
    }

    if (this.props.user !== prevProps.user) {
      this.setUser();
    }
  }

  setLoggedIn = () =>{
    this.setState({
      isLoggedIn: this.props.isLoggedIn
    })
  }

  setUser = () =>{
    this.setState({
      user: this.props.user
    })
  }

  render(){
    console.log(this.props.isLoggedIn)
    return (  
      <div className="tool-bar">
        <div>
          <Link to="/">Home</Link> | 
          <Link to="/aboutme">About Me</Link> | 
          <Link to="/newpost">New Post</Link>
        </div>
        {!this.state.isLoggedIn? 
        <div>
          <Link to="/login">Login</Link> |
          <Link to="/signin">Sign In</Link>
        </div> :
        <div>
          <span className="user-name"> Hello {this.state.user} </span> 
          <NavLink to="/" onClick={this.props.handleLogout}>Logout</NavLink> 
        </div>}
      </div>
    );
  }
}

export default Toolbar;